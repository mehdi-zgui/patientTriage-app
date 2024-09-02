import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import  train_test_split
from sklearn.preprocessing import StandardScaler

# Load your dataset
df = pd.read_excel(r"/Users/dell/Desktop/TRI/patientTriage-app/backend/datasett.xlsx")

# Define features and target
features = [
    "Sex",
    "Age",
    "Arrival mode",
    "Injury",
    "Mental",
    "Pain",
    "NRS_pain",
    "SBP",
    "DBP",
    "HR",
    "RR",
    "BT",
    "Saturation",
]
target = "KTAS_expert"

# Check the class distribution
print("Class distribution in target variable:")
print(df[target].value_counts())

# Select features and target
X = df[features]
y = df[target]

# Identify and replace non-numeric values with column averages
for col in X.columns:
    if X[col].dtype == "object":  # Check if the column contains non-numeric values
        try:
            X[col] = pd.to_numeric(
                X[col], errors="coerce"
            )  # Convert to numeric (errors='coerce' converts non-convertible values to NaN)
        except ValueError:
            X[col] = X[col].apply(
                lambda x: pd.to_numeric(x, errors="coerce")
            )  # Convert each value individually

    # Replace NaN values with column average
    col_mean = X[col].mean()
    X[col].fillna(col_mean, inplace=True)

# Perform train-test split on the preprocessed data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Data preprocessing (scaling numerical features)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Initialize and train the RandomForestClassifier
rf_classifier = RandomForestClassifier(random_state=42, class_weight="balanced")
rf_classifier.fit(X_train_scaled, y_train)

# Make predictions on the test set
y_pred = rf_classifier.predict(X_test_scaled)

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print(f"Test Accuracy: {accuracy:.2f}")

# Evaluate model performance with additional metrics
print("Classification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Save the trained model
joblib.dump(rf_classifier, "rf_model.joblib")
print("Model saved successfully!")
