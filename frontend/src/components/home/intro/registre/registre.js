import React, { useState } from 'react';
import axios from 'axios'
import './registre.css'


function Registre() {
    const [responseStatus, setResponseStatus] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');

    const [formData, setFormData] = useState({
        cin: '',
        name: '',
        date: '',
        type: 'nurse',
        service: '1',
        tel: '',
        email: '',
        password: ''
    });

    // state of inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // add personnel
    const addPer = async (event) => {
        event.preventDefault();
        if (!validateEmail(formData.email)) {
            alert("Please enter a valid email.");
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/add_personnel', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract data from the response
            const data = response.data;
            setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
            setFormData({
                cin: '',
                name: '',
                date: '',
                type: 'nurse',
                service: '1',
                tel: '',
                email: '',
                password: ''
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
            // Handle errors from the request itself (e.g., network errors, timeout errors)
            console.error("Error during the request:", error.message);
        }
    };

    return (
        <div className='reg'>
            <h2>Registre</h2>
            {responseMessage && responseStatus === 201 ? <p style={{ color: 'green', marginLeft: '30px' }}>{responseMessage}</p> : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}
            <form className="formm" onSubmit={addPer}>
                <input
                    type="text"
                    name="cin"
                    placeholder="CIN"
                    required
                    value={formData.cin}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nom Complete"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label htmlFor="date">Date de Naissance :
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </label>
                <label htmlFor="type">Type de personnel :
                    <select name="type" id="type" value={formData.type} onChange={handleInputChange}>
                        <option value="nurse">Nurse</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </label>
                <label htmlFor="service">Service:
                    <select name="service" id="service" value={formData.service} onChange={handleInputChange}>
                        <option value="1">Emergency Services</option>
                        <option value="2">Inpatient Services</option>
                        <option value="3">Outpatient Services</option>
                        <option value="4">Surgical Services</option>
                        <option value="5">Diagnostic Services</option>
                        <option value="6">Maternity and Newborn Services</option>
                        <option value="7">Pediatric Services</option>
                        <option value="8">Intensive Care Units</option>
                        <option value="9">Pharmacy</option>
                        <option value="10">Rehabilitation Services</option>
                        <option value="11">Oncology Services</option>
                        <option value="12">Cardiology Services</option>
                        <option value="13">Mental Health and Psychiatry Services</option>
                        <option value="14">Geriatric Services</option>
                        <option value="15">Palliative and Hospice Care</option>
                    </select>
                </label>
                <input
                    type="tel"
                    name="tel"
                    placeholder="Numero de telephone"
                    required
                    value={formData.tel}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de pass"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <button type="submit">Registre</button>
            </form>

        </div>
    );
}

export default Registre;
