import joblib
import pandas as pd
from database import engine
from flask import Flask, jsonify, request, session
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sqlalchemy import text

# Load the trained RandomForestClassifier model
rf_model = joblib.load("rf_model.joblib")


# Function to preprocess data and make predictions
def process_and_predict(data):
    # Perform data preprocessing
    data["age"] = int(data["age"])
    data["sex"] = int(data["sex"])
    data["arrivalMode"] = int(data["arrivalMode"])
    data["injury"] = int(data["injury"])
    data["mentalStatus"] = int(data["mentalStatus"])
    data["pain"] = int(data["pain"])
    data["nrsPain"] = int(data["nrsPain"])
    data["systolicBP"] = int(data["systolicBP"])
    data["diastolicBP"] = int(data["diastolicBP"])
    data["heartRate"] = int(data["heartRate"])
    data["respirationRate"] = int(data["respirationRate"])
    data["bodyTemperature"] = float(data["bodyTemperature"])
    data["oxygenSaturation"] = int(data["oxygenSaturation"])

    # Prepare the data for model prediction
    X = [
        [
            data["age"],
            data["sex"],
            data["arrivalMode"],
            data["injury"],
            data["mentalStatus"],
            data["pain"],
            data["nrsPain"],
            data["systolicBP"],
            data["diastolicBP"],
            data["heartRate"],
            data["respirationRate"],
            data["bodyTemperature"],
            data["oxygenSaturation"],
        ]
    ]

    # Make predictions using the trained model
    predicted_diagnostic = rf_model.predict(X)[0]


    return predicted_diagnostic



# Function to insert consultation data into the database
def insert_into_database(data, predicted_diagnostic, disease):

    with engine.connect() as conn:
        trans = conn.begin()

        sql_query = text(
            "INSERT INTO consultation (cin_patient, cin_personnel, age, sex, arrival_mode, injury, "
            "mental_status, pain, nrs_pain, systolic_blood_pressure, diastolic_blood_pressure, "
            "heart_rate, respiration_rate, body_temperature, oxygen_saturation, date_consultation, diagnostic, symptom_1, symptom_2, symptom_3, disease) "
            "VALUES (:cinPa, :cinPer, :age, :sex, :arrivalMode, :injury, :mentalStatus, :pain, :nrsPain, :systolicBP, :diastolicBP, :heartRate, :respirationRate, :bodyTemperature, :oxygenSaturation, CURDATE(), :predicted, :symptom_1, :symptom_2, :symptom_3, :disease)"
        )

        conn.execute(
            sql_query,
            {
                "cinPa": data["cin"],
                "cinPer": data["cinPer"],
                "age": data["age"],
                "sex": data["sex"],
                "arrivalMode": data["arrivalMode"],
                "injury": data["injury"],
                "mentalStatus": data["mentalStatus"],
                "pain": data["pain"],
                "nrsPain": data["nrsPain"],
                "systolicBP": data["systolicBP"],
                "diastolicBP": data["diastolicBP"],
                "heartRate": data["heartRate"],
                "respirationRate": data["respirationRate"],
                "bodyTemperature": data["bodyTemperature"],
                "oxygenSaturation": data["oxygenSaturation"],
                "predicted": predicted_diagnostic,
                "symptom_1": data["symptom_1"],
                "symptom_2": data["symptom_2"],
                "symptom_3": data["symptom_3"],
                "disease": disease
            },
        )
        # Commit the transaction
        trans.commit()
        return True


def get_consultations():
    with engine.connect() as conn:
        trans = conn.begin()
        query = text(
            """
            SELECT consultation.consultation_id, 
            consultation.cin_patient, 
            consultation.age, 
            consultation.sex, 
            consultation.arrival_mode, 
            consultation.injury, 
            consultation.mental_status, 
            consultation.pain, 
            consultation.nrs_pain, 
            consultation.systolic_blood_pressure, 
            consultation.diastolic_blood_pressure, 
            consultation.heart_rate, 
            consultation.respiration_rate, 
            consultation.body_temperature, 
            consultation.oxygen_saturation, 
            consultation.date_consultation, 
            consultation.diagnostic, 
            consultation.symptom_1, 
            consultation.symptom_2, 
            consultation.symptom_3, 
            consultation.disease, 
            treatment.treatment_description 
            FROM consultation 
            LEFT JOIN treatment ON consultation.consultation_id = treatment.consultation_id
            """
        )

        result = conn.execute(query)

        all_results = result.all()
        trans.commit()
        if all_results:
            result_dicts = []
            for x in all_results:
                result_dicts.append(x._asdict())  # Convert the result to a dictionarys
            return result_dicts
        else:
            return None


def get_consultations_patient(cin):
    with engine.connect() as conn:
        trans = conn.begin()
        query = text(
            """
            SELECT consultation.consultation_id, 
            consultation.cin_patient, 
            consultation.age, 
            consultation.sex, 
            consultation.arrival_mode, 
            consultation.injury, 
            consultation.mental_status, 
            consultation.pain, 
            consultation.nrs_pain, 
            consultation.systolic_blood_pressure, 
            consultation.diastolic_blood_pressure, 
            consultation.heart_rate, 
            consultation.respiration_rate, 
            consultation.body_temperature, 
            consultation.oxygen_saturation, 
            consultation.date_consultation, 
            consultation.diagnostic,
            consultation.symptom_1, 
            consultation.symptom_2, 
            consultation.symptom_3, 
            consultation.disease,  
            treatment.treatment_description 
            FROM consultation 
            LEFT JOIN treatment ON consultation.consultation_id = treatment.consultation_id
            where cin_patient = :cin  
            
        """
        )

        result = conn.execute(
            query,
            {
                "cin": cin,
            },
        )

        all_results = result.all()
        trans.commit()
        if all_results:
            result_dicts = []
            for x in all_results:
                result_dicts.append(x._asdict())  # Convert the result to a dictionarys
            return result_dicts
        else:
            return None
