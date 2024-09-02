import React from 'react'
import linkdin from '../../../images/linkdin.png'
import facebook from '../../../images/facebook.png'
import instagram from '../../../images/instagram.png'
import './contact.css'

function Contact() {
    return (
        <div id='contact'>
            <div className='tex'>
                <div className='we'>
                    ON VOUS AIDE A CONSULTER VOTRE <span style={{ color: 'rgb(0, 242, 255)', textDecoration: 'underline' }}>SANTE </span> ET
                    DE VOTRE ENVIRONNEMENT 
                </div>
                <br />
                <br />
                <div className='lien'>
                    <a href="+">Terms & Condition</a>
                    <a href="+">Privacy Policy</a>
                </div>
            </div>
            <div className='info'>
                <div className='social'>
                    <a href="+"><img src={linkdin} alt="linkdin" className='soc1' /></a>
                    <a href="+"><img src={facebook} alt="facebook" className='soc2' /></a>
                    <a href="+"><img src={instagram} alt="instagram" className='soc3' /></a>
                </div>
                <br />
                <div>
                    Phone: +212675811873 <br />
                    Emai: mehdizgui1@gmail.com
                </div>
            </div>
        </div>
    )
}

export default Contact