# 🎓 AI-Powered Student Performance Prediction & Academic Analytics Platform

A full-stack AI-powered web application that predicts student academic performance using Machine Learning, behavioral analysis, and intelligent analytics.

The platform helps students analyze academic habits and performance patterns to predict:

- 📈 Predicted GPA
- ⚠️ Academic Risk Level

Instead of only displaying raw academic data, the system is designed to evolve into an intelligent academic companion capable of:
- analyzing performance trends
- detecting weak areas
- generating personalized recommendations
- tracking academic growth

---

# 🚀 Current Progress

## ✅ Completed Features

### 🔐 Authentication System
- JWT-based authentication
- Password hashing using bcrypt
- Secure login & signup
- Protected API routes
- Token-based frontend authorization

---

### 🤖 Machine Learning Integration
Implemented:
- GPA Prediction Model
- Academic Risk Prediction Model

Predictions are generated using:
- Attendance
- Average marks
- Study hours
- Assignment completion
- Sleep hours
- Stress levels
- Deadlines missed
- Screen time

---

### 🗄️ Database Integration
- SQLite database integration
- SQLAlchemy ORM setup
- User data storage
- Prediction history storage
- Recent predictions tracking

---

### 📊 Dashboard Features
Current dashboard includes:
- Student input panel
- AI prediction card
- GPA & risk display
- Quick summary section
- Recent predictions/history section

---

### 🔗 Frontend ↔ Backend Integration
Successfully connected:
- React frontend
- FastAPI backend
- ML prediction APIs
- Authentication APIs
- Prediction history APIs

---

# 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js |
| Frontend Build Tool | Vite |
| Styling | CSS + Inline Styling |
| Backend | FastAPI |
| Language | Python |
| Database | SQLite |
| ORM | SQLAlchemy |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas |
| Model Serialization | Joblib |
| Authentication | JWT Authentication |
| Password Security | Passlib + bcrypt |
| API Testing | Swagger UI / FastAPI Docs |
| Version Control | Git & GitHub |

---

# 🧠 Machine Learning Features

## 📌 Risk Prediction
Predicts:
- Low Risk
- Medium Risk
- High Risk

The goal is to identify students who may require academic improvement or support.

---

## 📌 GPA Prediction
Predicts a student's expected GPA based on current academic and behavioral metrics.

---

# 🔐 Authentication Workflow

```text
Signup
→ Password Hashing
→ Login
→ JWT Token Generation
→ Token Stored in Frontend
→ Protected API Verification
→ Authorized Access
```

---

# 🧩 System Architecture

```text
React Frontend
       ↓
FastAPI Backend
       ↓
JWT Authentication
       ↓
SQLite Database
       ↓
Machine Learning Models
```

---

# 📁 Project Structure

```text
student-performance-predictor/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│
├── ML/
│   ├── risk_model.pkl
│   ├── gpa_model.pkl
│   ├── train_risk_model.py
│   └── train_gpa_model.py
│
├── data/
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/student-performance-predictor.git
cd student-performance-predictor
```

---

## 2️⃣ Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:
```bash
http://127.0.0.1:8000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | User registration |
| POST | `/login` | User login & JWT generation |
| POST | `/predict` | GPA & risk prediction |
| GET | `/history` | Fetch recent predictions |

---

# 🌟 Planned Features

The platform is planned to expand into a complete academic analytics ecosystem with:

- 📈 Interactive charts & analytics
- 💡 AI-generated insights
- 🧠 Personalized recommendations
- 📅 Adaptive study planner
- 🔮 What-if performance simulator
- 📊 Progress tracking system
- 📱 Responsive dashboard UI
- 👨‍🏫 Teacher/Mentor dashboard

---

# 🎯 Project Goal

The vision of this project is to create an intelligent academic analytics platform that helps students:

- Understand academic performance
- Detect negative performance patterns
- Improve consistency
- Receive AI-powered recommendations
- Track long-term academic growth

The platform aims to combine:
- Machine Learning
- Analytics
- Visualization
- Intelligent guidance

into one unified student performance intelligence system.

---

# 👨‍💻 Author

Shreya Shankar
