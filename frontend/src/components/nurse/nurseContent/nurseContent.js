import React from 'react'
import './nurseContent.css'
import Consultation from './pages/consultation/consultation'
import Patients from './pages/patients/patients'
import Historyy from './pages/historyy/historyy'
import NurseProfile from './pages/nurseProfile/nurseProfile'

function NurseContent(props) {
  return (
    <div className='nurseContent'>
      {props.elm1 === '1' ? <Patients /> :
        props.elm1 === '2' ? <Consultation /> :
          props.elm1 === '3' ? <Historyy /> :
            <NurseProfile />}
    </div>
  )
}

export default NurseContent