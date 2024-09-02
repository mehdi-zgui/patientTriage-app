import joblib
import pandas as pd
from sklearn.calibration import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler

# Load your dataset
df = pd.read_csv("/Users/dell/Desktop/TRI/patientTriage-app/backend/dataset.csv")


df = df.drop(
    columns=[
        "Symptom_4",
        "Symptom_5",
        "Symptom_6",
        "Symptom_7",
        "Symptom_8",
        "Symptom_9",
        "Symptom_10",
        "Symptom_11",
        "Symptom_12",
        "Symptom_13",
        "Symptom_14",
        "Symptom_15",
        "Symptom_16",
        "Symptom_17",
    ]
)

for col in df.columns:

    df[col] = df[col].str.replace("_", " ")

# print(df.head())

# Define features and target
X = df[["Symptom_1", "Symptom_2", "Symptom_3"]]
X = pd.get_dummies(X)

# Convert the target variable using label encoding
le = LabelEncoder()
y = le.fit_transform(df["Disease"])

# Step 3: Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 4: Train the model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Step 5: Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred, target_names=le.classes_)

# print(f"Accuracy: {accuracy}")
# print("Classification Report:")
# print(report)


def predict_disease(s1, s2, s3):
    # Prepare input data for predictio
    input_data = pd.DataFrame({"Symptom_1": [s1], "Symptom_2": [s2], "Symptom_3": [s3]})

    # Encode categorical variables using one-hot encoding
    input_data_encoded = pd.get_dummies(input_data)

    # Ensure input data has the same columns as the training data after one-hot encoding
    # You may need to align the columns if they are not the same
    input_data_encoded = input_data_encoded.reindex(columns=X.columns, fill_value=0)

    # Make predictions
    predictions = model.predict(input_data_encoded)

    # Decode the predicted labels if needed
    predicted_diseases = le.inverse_transform(predictions)
    return predicted_diseases[0]



