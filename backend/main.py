from fastapi import FastAPI, Request, Depends
from fastapi import HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field 
from sqlalchemy.orm import Session
import joblib
import pandas as pd
from backend.database import engine, Base, SessionLocal
from backend.models import User, Prediction
from passlib.context import CryptContext
from jose import jwt,JWTError
from datetime import datetime, timedelta

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = "mysecretkey"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
    ):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid authentication credentials"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise credentials_exception

    return user

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# -------------------- SCHEMAS --------------------

class SignupData(BaseModel):
    name: str
    email: str
    password: str

class LoginData(BaseModel):
    email: str
    password: str

class StudentData(BaseModel):
    attendance: float = Field(..., ge=0, le=100)
    average_marks: float = Field(..., ge=0, le=100)
    study_hours: float = Field(..., ge=0, le=12)
    assignments_completed: float = Field(..., ge=0, le=50)
    sleep_hours: float = Field(..., ge=0, le=12)
    stress_level: float = Field(..., ge=0, le=10)
    deadlines_missed: float = Field(..., ge=0, le=15)
    screen_time: float = Field(..., ge=0, le=16)



# -------------------- MIDDLEWARE --------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LOAD MODEL --------------------

risk_model = joblib.load("ML/risk_model.pkl")
gpa_model = joblib.load("ML/gpa_model.pkl")

# -------------------- ROUTES --------------------

@app.get("/")
def home():
    return {"message": "API is working"}

# ---------- SIGNUP ----------

@app.post("/signup")
def signup(user: SignupData, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {"message": "User already exists"}

    new_user = User(
        name=user.name,
        email=user.email,
        password=pwd_context.hash(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful"}

# ---------- LOGIN ----------

@app.post("/login")
def login(user: LoginData, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        return {"message": "User not found"}
    
    if not pwd_context.verify(
        user.password,
        existing_user.password
    ):
        return {"message": "Invalid password"}

    access_token = create_access_token(
         data={
             "user_id": existing_user.id
            }
        )

    return {
        "message": "Login successful",
        "access_token": access_token 
        }

# ---------- PREDICT ----------
@app.post("/predict")
def predict(data: StudentData,  current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    input_data = pd.DataFrame([{
        "attendance": data.attendance,
        "average_marks": data.average_marks,
        "study_hours": data.study_hours,
        "assignments_completed": data.assignments_completed,
        "sleep_hours": data.sleep_hours,
        "stress_level": data.stress_level,
        "deadlines_missed": data.deadlines_missed,
        "screen_time": data.screen_time
    }])

    # Risk Prediction
    risk_prediction = risk_model.predict(input_data)[0]

    # GPA Prediction
    gpa_prediction = gpa_model.predict(input_data)[0]
    gpa_prediction = round(gpa_prediction, 2)

    # Save Prediction
    new_prediction = Prediction(
        user_id=current_user.id,
        attendance=data.attendance,
        average_marks=data.average_marks,
        study_hours=data.study_hours,
        assignments_completed=data.assignments_completed,
        sleep_hours=data.sleep_hours,
        stress_level=data.stress_level,
        deadlines_missed=data.deadlines_missed,
        screen_time=data.screen_time,
        risk_level=risk_prediction,
        gpa=gpa_prediction
    )

    db.add(new_prediction)
    db.commit()

    return {
        "risk_level": risk_prediction,
        "gpa": gpa_prediction
    }

# ---------- HISTORY ----------

@app.get("/history")
def get_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .order_by(Prediction.id.desc())
        .limit(3)
        .all()
    )

    result = []

    for p in predictions:
        result.append({
            "risk_level": p.risk_level,
            "gpa": p.gpa,
            "date": p.created_at
        })

    return {"history": result}