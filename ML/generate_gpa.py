import pandas as pd

# Load dataset
df = pd.read_csv("../data/student_data.csv")
# GPA formula
df["gpa"] = (
    df["average_marks"] / 10
    + (df["attendance"] - 75) * 0.01
    + df["assignments_completed"] * 0.005
    + df["study_hours"] * 0.03
    + df["sleep_hours"] * 0.02
    - df["stress_level"] * 0.05
    - df["deadlines_missed"] * 0.08
    - df["screen_time"] * 0.03
)

# Clamp GPA between 0 and 10
df["gpa"] = df["gpa"].clip(0, 10)

# Round GPA to 2 decimals
df["gpa"] = df["gpa"].round(2)

def get_risk(gpa):
    if gpa >= 8:
        return "Low"
    elif gpa >= 6:
        return "Medium"
    else:
        return "High"

df["risk_level"] = df["gpa"].apply(get_risk)

# Save updated dataset
df.to_csv("student_data.csv", index=False)

print(df.head())
print("GPA column added successfully!")

print(df.isnull().sum())