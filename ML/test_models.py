import joblib
import pandas as pd

# Load models
risk_model = joblib.load("risk_model.pkl")
gpa_model = joblib.load("gpa_model.pkl")

# Sample student input
sample_data = pd.DataFrame([{
    "attendance": 50,
    "average_marks": 70,
    "study_hours": 9,
    "assignments_completed": 32,
    "sleep_hours": 9,
    "stress_level": 1,
    "deadlines_missed": 0,
    "screen_time": 2
}])

# Predict risk
risk_prediction = risk_model.predict(sample_data)[0]

# Predict GPA
gpa_prediction = gpa_model.predict(sample_data)[0]

# Round GPA
gpa_prediction = round(gpa_prediction, 2)

print("Predicted Risk Level:", risk_prediction)
print("Predicted GPA:", gpa_prediction)