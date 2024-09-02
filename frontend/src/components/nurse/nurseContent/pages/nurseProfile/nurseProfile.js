import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './nurseProfile.css'
import { getUserFromStorage } from '../../../../../utils/storage';

function NurseProfile() {
    const user = getUserFromStorage()
    const cin = user.cin_personnel
    const [responseStatus, setResponseStatus] = useState(0);
    const [responseMessage, setResponseMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        cin: '',
        name: '',
        date: '',
        tel: '',
        email: '',
        password: ''
    });

    // Toggles the showPassword state
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // state of inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/profile', {
                    params: { cin: cin },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = response.data;
                console.log(data);
                setResponseMessage(data.message);

                if (response.status === 201) {
                    setFormData({
                        cin: data.cin_personnel,
                        name: data.full_name,
                        date: new Date(data.date_of_birth).toISOString().slice(0, 10),
                        tel: data.phone_number,
                        email: data.email,
                        password: data.password
                    });
                    setResponseStatus(response.status);
                    console.log("Success:", data);
                } else {
                    console.error("Failure:", data);
                }
            } catch (error) {
                console.error("Error during the request:", error.message);
            }
        }

        fetchData();
    }, [cin]);

    // update personnel

    const updatePer = async (event) => {
        event.preventDefault();
        if (!validateEmail(formData.email)) {
            alert("Please enter a valid email.");
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/update_personnel', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract data from the response
            const data = response.data;
            setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message

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
        <div>
            <h2 id='profile1'>Profile</h2>

            <form className="nurseProfile" onSubmit={updatePer}>
                <input
                    type="text"
                    name="cin"
                    placeholder="CIN"
                    value={formData.cin}
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Nom complete"
                    value={formData.name}
                    required
                    onChange={handleInputChange}
                />
                <label htmlFor="date">Date de Naissance:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        required
                        onChange={handleInputChange}
                    />
                </label>
                <input
                    type="tel"
                    name="tel"
                    placeholder="Numero de telephone"
                    value={formData.tel}
                    required
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
                    onChange={handleInputChange}
                />
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="mot de pass"
                    value={formData.password}
                    required
                    onChange={handleInputChange}
                />
                <div className="password-checkbox-container">
                    <label htmlFor="show-password" className="password-checkbox-label">
                        Affiche mot de pass
                    </label>
                    <input
                        type="checkbox"
                        id="show-password"
                        className="password-checkbox"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                    />
                </div>

                <button type="submit">Enregistrer</button>
            </form>
            {responseMessage && responseStatus === 201 ? <p style={{ color: 'green', marginLeft: '30px' }}>{responseMessage}</p> : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}
        </div>
    )
}

export default NurseProfile