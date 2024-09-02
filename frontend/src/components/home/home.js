import React, { useState } from "react";
import Navbar from "./NavBar/navbar";
import Intro from "./intro/intro";
import Model from "./intro/model/model";
import './home.css'
import About from "./about/about";
import Contact from "./contact/contact";
import { getUserFromStorage } from "../../utils/storage";
import { Navigate } from 'react-router-dom';

function Home() {
  const user = getUserFromStorage()
  const [model, setModel] = useState(false);

  if (user !== null) {
    const redirectPath = user.personnel_type === 'nurse' ? "/nurse" : "/doctor";
    return <Navigate to={redirectPath} replace />;
  }


  const toggleModel = () => {
    setModel(!model);
  };
  if (model) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <div className="App">
      <Navbar show={toggleModel} />
      <Intro />
      {model && <Model show={toggleModel} />}
      <About />
      <Contact />
    </div>
  );
}

export default Home;