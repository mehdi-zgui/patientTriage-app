import React, { useState } from 'react'
import NurseNave from './nurseNav/nurseNave'
import NurseContent from './nurseContent/nurseContent'
import NurseSide from './nurseSide/nurseSide'
import './nurse.css'
import { Navigate } from 'react-router-dom';
import { getUserFromStorage } from '../../utils/storage'

function Nurse() {
  const user = getUserFromStorage()
  const [elm, setElm] = useState('1')

  if (user == null) {
    return <Navigate to="/" replace />;
  } else if (user.personnel_type !== 'nurse') {
    return <Navigate to={`/${user.personnel_type}`} replace />;
  }

  function displayElm(x) {
    setElm(x)
  }
  return (
    <div className='nu'>
      <NurseNave />
      <div className='sAndC1'>
        <NurseSide disp={displayElm} />
        <NurseContent elm1={elm} />
      </div>
    </div>
  )
}

export default Nurse