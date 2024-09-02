import React, { useState } from 'react'
import DoctorNav from './doctorNav/doctorNav'
import DoctorSide from './doctorSide/doctorSide'
import DoctorContent from './doctorContent/doctorContent'
import './doctor.css'
import { Navigate } from 'react-router-dom';
import { getUserFromStorage } from '../../utils/storage'

function Doctor() {
    const user = getUserFromStorage()
    const [elm, setElm] = useState('1')

    if (user == null) {
        return <Navigate to="/" replace />;
    } else if (user.personnel_type !== 'doctor') {
        return <Navigate to={`/${user.personnel_type}`} replace />;
    }


    function displayElm(x) {
        setElm(x)
        console.log(x)
    }

    return (
        <div className='do'>
            <DoctorNav />
            <div className='sAndC2'>
                <DoctorSide disp={displayElm} />
                <DoctorContent elm1={elm} />
            </div>
        </div>
    )
}

export default Doctor