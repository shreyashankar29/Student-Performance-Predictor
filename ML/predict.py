import joblib
import pandas as pd
model = joblib.load("model.pkl")

sample = pd.DataFrame([{
    "attendance": 80,
    "avg_marks": 75,
    "study_hours": 4,
    "assignments_completion": 85,
    "sleep_hours": 6,
    "stress_level": 5,
    "deadlines_missed": 2,
    "consistency_score": 5,
    "screen_time": 4
}])

prediction = model.predict(sample)
print("Predicted Risk:", prediction[0])