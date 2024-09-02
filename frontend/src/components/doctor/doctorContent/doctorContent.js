import React from 'react'
import Treatment from './pages/treatment/treatment'
import Radiography from './pages/radiography/radiography'
import DoctorProfile from './pages/doctorProfile/doctorProfile';
import './doctorContent.css'
import Historyy1 from './pages/historyy/historyy1';

function DoctorContent(props) {


    return (
        <div className='doctorContent'>
            {props.elm1 === '1' ? <Treatment /> :
                props.elm1 === '2' ? <Radiography /> :
                    props.elm1 === '3' ? <Historyy1 /> :
                        <DoctorProfile />}
        </div>
    )
}

export default DoctorContent