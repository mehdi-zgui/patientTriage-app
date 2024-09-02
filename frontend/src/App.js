import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/home/home";
import Nurse from "./components/nurse/nurse";
import Doctor from "./components/doctor/doctor";
import Test from "./test";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nurse" element={<Nurse />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
