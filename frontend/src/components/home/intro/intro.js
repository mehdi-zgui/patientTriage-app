import React from 'react'
import './intro.css'
import pers from '/Users/dell/Desktop/TRI/patientTriage-app/frontend/src/images/pers.png'
import Signin from './sign/signin.js'


function Intro() {

    return (
        <div id="intro">
            <div className="introContent">
                <span className="introText">VOTRE SANTE <br />ET NOTRE <br /><span className="priority">PRIORITE</span></span>
                <p className="parag">ON VOUS AIDE A CONSULATION ET SURVIER VOTRE SANTER  </p>
            </div>
            <div className='form'>
                <Signin />
            </div>
            <img src={pers} alt="personne" className='pers' />
        </div>
    )
}

export default Intro