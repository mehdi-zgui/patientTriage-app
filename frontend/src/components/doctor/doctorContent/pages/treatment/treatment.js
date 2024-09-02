import React, { useState } from 'react'
import axios from 'axios'
import './treatment.css'
import { getUserFromStorage } from '../../../../../utils/storage'

function Treatment() {
    const user = getUserFromStorage()
    const [responseStatus, setResponseStatus] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');
    const [formData, setFormData] = useState({
        consult_id: '',
        cinPer: user.cin_personnel,
        treatment: '',
    })

    // state of inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    // add treatment
    const addTreatment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/add_treatment', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract data from the response
            const data = response.data;
            setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
            setFormData({
                consult_id: '',
                cinPer: user.cin_personnel,
                treatment: '',
            });

            if (response.status === 201) {
                // Handle success
                setResponseStatus(response.status)
                console.log("Success:", data);
            } else {
                // Handle failure
                setResponseStatus(0)
                console.error("Failure:", data);
            }

        } catch (error) {
            // Handle errors from the request itself (e.g., network errors, timeout errors)
            console.error("Error during the request:", error.message);
        }
    };


    return (
        <div>
            <h2 id='treat'>Treatment</h2>

            <form className="serchPat" onSubmit={addTreatment}>
                <h4>Saisissez l'ID de cette consultation:</h4>
                <input type="text" name="consult_id" placeholder="Consultation ID" value={formData.consult_id} required onChange={handleInputChange} />
                <h4>ajouter le treatment:</h4>
                <textarea name="treatment" id="treatment" cols="30" rows="10" value={formData.treatment} onChange={handleInputChange} required></textarea>
                <button type="submit">Ajouter</button>
            </form>
            {responseMessage && responseStatus === 201 ? <p style={{ color: 'green', marginLeft: '30px' }}>{responseMessage}</p> : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}
        </div>
    )
}

export default Treatment