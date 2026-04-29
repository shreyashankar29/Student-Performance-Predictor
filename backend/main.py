from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import joblib
import pandas as pd

from backend.database import engine, Base, SessionLocal
from backend.models import User, Prediction

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
    attendance: float
    avg_marks: float
    study_hours: float
    assignments_completion: float
    sleep_hours: float
    stress_level: float
    deadlines_missed: float
    consistency_score: float
    screen_time: float

# -------------------- DB DEPENDENCY --------------------

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------- MIDDLEWARE --------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key="your-secret-key")

# -------------------- LOAD MODEL --------------------

model = joblib.load("ML/model.pkl")

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
        password=user.password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Signup successful"}

# ---------- LOGIN ----------

@app.post("/login")
def login(user: LoginData, request: Request, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        return {"message": "User not found"}

    if existing_user.password != user.password:
        return {"message": "Invalid password"}

    request.session["user_id"] = existing_user.id

    return {"message": "Login successful"}

# ---------- PREDICT ----------

@app.post("/predict")
def predict(data: StudentData, request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")

    if not user_id:
        return {"message": "User not logged in"}

    user = db.query(User).filter(User.id == user_id).first()

    input_data = pd.DataFrame([{
        "attendance": data.attendance,
        "avg_marks": data.avg_marks,
        "study_hours": data.study_hours,
        "assignments_completion": data.assignments_completion,
        "sleep_hours": data.sleep_hours,
        "stress_level": data.stress_level,
        "deadlines_missed": data.deadlines_missed,
        "consistency_score": data.consistency_score,
        "screen_time": data.screen_time
    }])

    prediction = model.predict(input_data)

    new_prediction = Prediction(
        user_id=user.id,
        attendance=data.attendance,
        avg_marks=data.avg_marks,
        study_hours=data.study_hours,
        assignments_completion=data.assignments_completion,
        sleep_hours=data.sleep_hours,
        stress_level=data.stress_level,
        deadlines_missed=data.deadlines_missed,
        consistency_score=data.consistency_score,
        screen_time=data.screen_time,
        risk_level=prediction[0]
    )

    db.add(new_prediction)
    db.commit()

    return {"risk_level": prediction[0]}

# ---------- HISTORY ----------

@app.get("/history")
def get_history(request: Request, db: Session = Depends(get_db)):
    user_id = request.session.get("user_id")

    if not user_id:
        return {"message": "User not logged in"}

    user = db.query(User).filter(User.id == user_id).first()

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == user.id)
        .order_by(Prediction.id.desc())
        .limit(3)
        .all()
    )

    result = []

    for p in predictions:
        result.append({
            "risk_level": p.risk_level,
            "date": p.created_at
        })

    return {"history": result}