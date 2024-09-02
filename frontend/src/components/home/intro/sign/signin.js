import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './signin.css'
import { addUser } from '../../../../slice/user';

function Signin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState('');
    const [loginDetails, setLoginDetails] = useState({
        cin: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/check_personnel', loginDetails, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Extract data from the response
            const data = response.data;
            console.log(data)
            setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
            setLoginDetails({
                cin: '',
                password: '',
            });

            if (response.status === 201) {
                // Handle success
                dispatch(addUser(data))
                if (data.personnel_type === 'nurse') {
                    navigate('/nurse', { replace: true });
                    // navigate('/nurse');
                } else {
                    navigate('/doctor', { replace: true });
                    // navigate('/doctor');
                }
                // console.log("Success:", data);
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
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 >Sign In</h2>
                <input
                    type="text"
                    name="cin"
                    value={loginDetails.cin}
                    onChange={handleChange}
                    placeholder="CIN"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={loginDetails.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
                {responseMessage && <p style={{ color: 'red' }}>{responseMessage}</p>}
            </form>

        </div>
    );
}

export default Signin;
