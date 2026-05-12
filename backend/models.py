from sqlalchemy import Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Prediction(Base):
    __tablename__ = "predictions"

    id= Column(Integer, primary_key=True, index=True)
    user_id= Column(Integer, ForeignKey("users.id"))

    attendance= Column(Float)
    average_marks = Column(Float)
    study_hours = Column(Float)
    assignments_completed = Column(Float)
    sleep_hours = Column(Float)
    stress_level = Column(Float)
    deadlines_missed = Column(Float)
    screen_time = Column(Float)

    risk_level = Column(String)
    gpa = Column(Float)
    
    created_at = Column(String, default= str(datetime.utcnow()))

    user= relationship("User")