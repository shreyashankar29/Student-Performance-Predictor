import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Load dataset
data = pd.read_csv("data/student_data.csv")

# Features (X) and Target (y)
X = data.drop("risk_level", axis=1)
y = data["risk_level"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model
model = RandomForestClassifier()

# Train
model.fit(X_train, y_train)
import joblib
joblib.dump(model, "model.pkl")

# Predict
y_pred = model.predict(X_test)

# Evaluation
print(classification_report(y_test, y_pred))