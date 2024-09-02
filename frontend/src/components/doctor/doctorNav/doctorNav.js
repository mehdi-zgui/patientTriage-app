import React from 'react'
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './doctorNav.css'
import { deleteUser } from '../../../slice/user';
import { getUserFromStorage } from '../../../utils/storage';

function DoctorNav() {
    const user = getUserFromStorage()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/logout');

            // Extract data from the response
            const data = response.data;
            console.log(data)
            if (response.status === 201) {
                // Handle success
                dispatch(deleteUser())
                navigate('/', { replace: true });
                // navigate('/');
                // console.log("Success:", data);
            }
        } catch (error) {
            // Handle errors from the request itself (e.g., network errors, timeout errors)
            console.error("Error during the request:", error.message);
        }
    }


    return (
        <nav className='doctorNav'>
            <div><img src="./logo.png" alt="logo" className='logo2' /><span className='title2'>DIAGNOS IA </span></div>
            <div id='per2'>{user.full_name}</div>
            <button className='Logout2' onClick={logout}><LogOut /> Deconnecter</button>
        </nav>

    )
}

export default DoctorNav