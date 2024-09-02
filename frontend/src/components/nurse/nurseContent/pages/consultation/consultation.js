import React, { useState } from 'react'
import axios from 'axios'
import './consultation.css'
import { getUserFromStorage } from '../../../../../utils/storage';


function Consultation() {
  const user = getUserFromStorage()
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseDisease, setResponseDisease] = useState('');
  const [formData, setFormData] = useState({
    cin: '',
    cinPer: user.cin_personnel,
    age: '',
    sex: '2',
    arrivalMode: '1',
    injury: '1',
    mentalStatus: '1',
    pain: '1',
    nrsPain: '',
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    respirationRate: '',
    bodyTemperature: '',
    oxygenSaturation: '',
    symptom_1: '',
    symptom_2: '',
    symptom_3: ''
  });

  // state of inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    try {
      const response = await axios.post('http://127.0.0.1:5000/submit_consultation', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Extract data from the response
      const data = response.data;
      setResponseDisease(data.disease);
      setResponseMessage(data.predict);  // Assuming this is a function you've defined to set a response message
      setFormData({
        cin: '',
        cinPer: user.cin_personnel,
        age: '',
        sex: '2',
        arrivalMode: '1',
        injury: '1',
        mentalStatus: '1',
        pain: '1',
        nrsPain: '',
        systolicBP: '',
        diastolicBP: '',
        heartRate: '',
        respirationRate: '',
        bodyTemperature: '',
        oxygenSaturation: '',
        symptom_1: '',
        symptom_2: '',
        symptom_3: ''
      });
      if (response.status === 201) {
        // Handle success
        setResponseStatus(response.status)
        console.log("Success:", data);
      } else {
        // Handle failure
        console.error("Failure:", data);
      }
    } catch (error) {
      console.error('Error submitting consultation:', error);
    }
  };


  return (
    <div>
      <h2 id='Consultation'>Consultation</h2>

      <form className="formConst" onSubmit={handleSubmit}>
        <h4>Ajouter un  patient:</h4>
        <div className="rowConst">
          <input type="text" name="cin" placeholder="CIN" value={formData.cin} required onChange={handleInputChange} />
          <input type="number" name="age" placeholder="Age" value={formData.age} required onChange={handleInputChange} />
        </div>
        <div className="rowConst">
          <label htmlFor="sex">Sex:
            <select name="sex" id="sex" value={formData.sex} onChange={handleInputChange}>
              <option value="2">Male</option>
              <option value="1">Female</option>
            </select>
          </label>
          <label htmlFor="arrivalMode">Mode d'arrivée :
            <select name="arrivalMode" id="arrivalMode" value={formData.arrivalMode} onChange={handleInputChange}>
              <option value="1">Walking</option>
              <option value="2">119 use</option>
              <option value="3">Private car</option>
              <option value="4">Private ambulance</option>
              <option value="5">Public transportation</option>
              <option value="6">Wheelchair</option>
              <option value="7">Others</option>
            </select>
          </label>
          <label htmlFor="injury">Blessure:
            <select name="injury" id="injury" value={formData.injury} onChange={handleInputChange}>
              <option value="1">Non-injury</option>
              <option value="2">Injury</option>
            </select>
          </label>
          <label htmlFor="mentalStatus">Mental:
            <select name="mentalStatus" id="mentalStatus" value={formData.mentalStatus} onChange={handleInputChange}>
              <option value="1">Alert</option>
              <option value="2">Verval response</option>
              <option value="3">Pain response</option>
              <option value="4">Unconciousness</option>
            </select>
          </label>
          <label htmlFor="pain">Douleur :
            <select name="pain" id="pain" value={formData.pain} onChange={handleInputChange}>
              <option value="1">Pain</option>
              <option value="2">Non-pain</option>
            </select>
          </label>
        </div>
        <div className="rowConst">
          <input type="number" name="nrsPain" value={formData.nrsPain} placeholder="Numeric rating scales of pain" required onChange={handleInputChange} />
          <input type="number" name="systolicBP" value={formData.systolicBP} placeholder="Systolid blood pressure" required onChange={handleInputChange} />
          <input type="number" name="diastolicBP" value={formData.diastolicBP} placeholder="Diastolic blood pressure" required onChange={handleInputChange} />
        </div>
        <div className="rowConst">
          <input type="number" name="heartRate" value={formData.heartRate} placeholder="Heart rate" required onChange={handleInputChange} />
          <input type="number" name="respirationRate" value={formData.respirationRate} placeholder="Respiration rate" required onChange={handleInputChange} />
        </div>
        <div className="row">
          <input type="number" name="bodyTemperature" value={formData.bodyTemperature} placeholder="Body temperature" required onChange={handleInputChange} />
          <input type="number" name="oxygenSaturation" value={formData.oxygenSaturation} placeholder="Saturation to use pulse oxmeter" required onChange={handleInputChange} />
        </div>
        <div className="rowConst">
          <input type="text" name="symptom_1" value={formData.symptom_1} placeholder="Symptom 1" required onChange={handleInputChange} />
          <input type="text" name="symptom_2" value={formData.symptom_2} placeholder="Symptom 2" required onChange={handleInputChange} />
          <input type="text" name="symptom_3" value={formData.symptom_3} placeholder="Symptom 3" required onChange={handleInputChange} />
        </div>
        <button type="submit">Ajouter </button>
      </form>
      {responseMessage && (responseStatus === 201 && responseMessage === '1')
        ? <p style={{ color: 'green', marginLeft: '30px' }}>Votre etat de Santé:Non-urgent,      Maladie Possible: {responseDisease}</p>
        : (responseMessage === '2' || responseMessage === '3')
          ? <p style={{ color: 'orange', marginLeft: '30px', whiteSpace: 'pre' }}>Votre etat de Santé: Urgent,      Maladie Possible: {responseDisease}</p>
          : responseMessage === '4'
            ? <p style={{ color: 'red', marginLeft: '30px' }}>Votre etat de Santé: Emergency,      Maladie Possible: {responseDisease}</p>
            : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}

    </div>
  )
}

export default Consultation