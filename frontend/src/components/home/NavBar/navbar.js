import React from 'react'
import './navbar.css'
import logo from '/Users/dell/Desktop/TRI/patientTriage-app/frontend/src/images/logo.png'
import { Link } from 'react-scroll'
import { LogIn } from 'lucide-react';

function Navbar(props) {
    return (
        <nav className='navbar'>
            <div><img src={logo} alt="logo" className='logo' /><span className='title'>DIAGNOS IA</span></div>
            <div className="desktopMenu">
                <Link activeClass='active' to='intro' spy={true} smooth={true} offset={-100} duration={500} className="menuItem">ACCUEIL</Link>
                <Link activeClass='active' to='about' spy={true} smooth={true} offset={-50} duration={500} className="menuItem">A propos de nous </Link>
                <Link activeClass='active' to='contact' spy={true} smooth={true} offset={-50} duration={500} className="menuItem">Contact</Link>
            </div>
            <button className='registre' onClick={props.show}><LogIn /> Registre</button>
        </nav>
    )
}

export default Navbar