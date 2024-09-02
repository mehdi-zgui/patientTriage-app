import os
from flask import Flask, request, render_template, redirect, url_for, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model # type: ignore



from tensorflow.keras.preprocessing import image # type: ignore
import numpy as np

# Import custom modules
from consultation import (
    get_consultations,
    get_consultations_patient,
    insert_into_database,
    process_and_predict,
)
from patients import add_patient, delete_patient, search_patient, update_patient
from personnel import add_personnel, check_personnel, search_profile, update_personnel
from treatment import add_treatment
from ai import predict_disease

app = Flask(__name__)
app.secret_key = "my_secret_key"
CORS(app)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'

app.config['UPLOAD_FOLDER'] = 'static/uploads/'

model = load_model('model.h5')

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(150, 150))  # Change target size as needed
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalize the image array
    
    prediction = model.predict(img_array)
    if prediction[0][0] > 0.5:
        return "Pneumonia"
    else:
        return "Normal"

@app.route("/radiographie", methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        prediction = predict_image(filepath)
        return jsonify({"filename": file.filename, "prediction": prediction}), 200

@app.route('/display/<filename>')
def display_image(filename):
    return redirect(url_for('static', filename='uploads/' + filename), code=301)


# Route to add patient
@app.route("/add_patient", methods=["POST"])
def add_pat():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)
    success2 = add_patient(data)
    if success2:
        return jsonify({"message": "Patient added successfully"}), 201
    else:
        return jsonify({"message": "Failed to add patient"}), 200

# Route to search patient
@app.route("/search_patient", methods=["GET"])
def search_pat():
    cin = request.args.get("cin")
    if cin is None:
        return jsonify({"message": "CIN parameter is required"}), 400

    success = search_patient(cin)
    if success is not None:
        return jsonify(success), 201
    else:
        return jsonify({"message": "There is no patient you are looking for"}), 200

# Route to delete patient
@app.route("/delete_patient", methods=["DELETE"])
def delete_pat():
    cin = request.args.get("cin")
    if cin is None:
        return jsonify({"message": "CIN parameter is required"}), 400
    success1 = delete_patient(cin)
    if not success1:
        return jsonify({"message": "Failed to delete patient"}), 200
    else:
        return jsonify({"message": "Patient deleted successfully"}), 201

# Route to update patient
@app.route("/update_patient", methods=["POST"])
def update_pat():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)
    success3 = update_patient(data)
    if success3:
        return jsonify({"message": "Patient updated successfully"}), 201
    else:
        return jsonify({"message": "Failed to update patient"}), 200

# Route to add personnel
@app.route("/add_personnel", methods=["POST"])
def add_per():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)
    perso = add_personnel(data)
    if perso:
        return jsonify({"message": "Personnel added successfully"}), 201
    else:
        return jsonify({"message": "Failed to add personnel"}), 200

# Route to check personnel
@app.route("/check_personnel", methods=["POST"])
def check_per():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)

    personnel = check_personnel(data)
    if personnel is not None:
        return jsonify(personnel), 201
    else:
        return jsonify({"message": "CIN or password is incorrect"}), 400

# Route to logout
@app.route("/logout", methods=["POST"])
def logout():
    return jsonify({"message": "logout"}), 201

# Route to submit consultation
@app.route("/submit_consultation", methods=["POST"])
def submit_consultation():
    data = request.json
    print(data)

    predicted_diagnostic = process_and_predict(data)
    disease = predict_disease(data["symptom_1"], data["symptom_2"], data["symptom_3"])

    if insert_into_database(data, predicted_diagnostic, disease):
        return jsonify({"predict": str(predicted_diagnostic), "disease": disease}), 201
    else:
        return jsonify({"error": "Failed to submit consultation"}), 400

# Route to profile
@app.route("/profile", methods=["GET"])
def profile():
    cin = request.args.get("cin")
    if cin is None:
        return jsonify({"message": "CIN parameter is required"}), 400

    profile = search_profile(cin)
    if profile is not None:
        return jsonify(profile), 201
    else:
        return jsonify({"message": "There is no patient you are looking for"}), 200

# Route to update personnel
@app.route("/update_personnel", methods=["POST"])
def update_per():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)
    success3 = update_personnel(data)
    if success3:
        return jsonify({"message": "Personnel updated successfully"}), 201
    else:
        return jsonify({"message": "Failed to update personnel"}), 200

# Route to get consultations
@app.route("/get_consultations", methods=["GET"])
def get_consult():
    consultations = get_consultations()
    if consultations is not None:
        return jsonify(consultations), 201
    else:
        return jsonify({"message": "There is no consultation"}), 200

# Route to search consultations by patient
@app.route("/search_consultations_patient", methods=["GET"])
def search_consult_pat():
    cin = request.args.get("cin")
    if cin is None:
        return jsonify({"message": "CIN parameter is required"}), 400

    consult_pat = get_consultations_patient(cin)
    if consult_pat is not None:
        return jsonify(consult_pat), 201
    else:
        return jsonify({"message": "There is no patient you are looking for"}), 200

# Route to add treatment
@app.route("/add_treatment", methods=["POST"])
def add_tre():
    data = request.json
    print("Data type:", type(data))
    print("Data content:", data)
    tret = add_treatment(data)
    if tret:
        return jsonify({"message": "Treatment added successfully"}), 201
    else:
        return jsonify({"message": "Failed to add Treatment"}), 200

if __name__ == "__main__":
    app.run(debug=True)
