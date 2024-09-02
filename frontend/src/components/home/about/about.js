import React from 'react'
import digital from '../../../images/digital.png'
import './about.css'

function About() {
    return (
        <div id='about'>
            <img src={digital} alt="digital" className='digital' />
            <div className='para'>
                <span><h1>A propos de nous </h1></span>
                Cette application permettra de réaliser les opérations suivantes :<br/>
                • Gérer les patient et les personnels de l’hôpital<br/>
                • Gérer les radiographies<br/>
                • Fournir une évaluation initiale de la gravité des symptômes présentés par les patients

            </div>
        </div>
    )
}

export default About