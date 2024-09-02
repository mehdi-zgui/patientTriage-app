import React, { useState } from 'react'
import axios from 'axios'
import './patients.css'

function Patients() {
  const [cin, setCin] = useState('');
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');

  const [formData, setFormData] = useState({
    cin: '',
    name: '',
    date: '',
    sex: 'male',
    tel: '',
    email: '',
    address: ''
  });

  // state of inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // add patient
  const addPat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/add_patient', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract data from the response
      const data = response.data;
      setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
      setFormData({
        cin: '',
        name: '',
        date: '',
        sex: 'male',
        tel: '',
        email: '',
        address: ''
      });

      if (response.status === 201) {
        // Handle success
        setResponseStatus(response.status)
        console.log("Success:", data);
      } else {
        // Handle failure
        console.error("Failure:", data);
      }

    } catch (error) {
      // Handle errors from the request itself (e.g., network errors, timeout errors)
      console.error("Error during the request:", error.message);
    }
  };

  // search patient

  const searchPat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:5000/search_patient', {
        params: { cin: cin },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract data from the response
      const data = response.data;
      setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message

      if (response.status === 201) {
        // Handle success
        setFormData({
          cin: data.cin_patient,
          name: data.full_name,
          date: new Date(data.date_of_birth).toISOString().slice(0, 10),
          sex: data.sex,
          tel: data.phone_number,
          email: data.email,
          address: data.adress
        });
        setResponseStatus(response.status)
        console.log("Success:", data);
      } else {
        // Handle failure
        setFormData({
          cin: '',
          name: '',
          date: '',
          sex: 'male',
          tel: '',
          email: '',
          address: ''
        });
        setResponseStatus(0)
        setCin('')
        console.error("Failure:", data);
      }
    } catch (error) {
      // Handle errors from the request itself (e.g., network errors, timeout errors)
      console.error("Error during the request:", error.message);
    }
  };


// delete patient
  const deletePat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete('http://127.0.0.1:5000/delete_patient', {
        params: { cin: cin },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract data from the response
      const data = response.data;
      setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
      console.log(responseMessage)
      console.log(response.status)
      setFormData({
        cin: '',
        name: '',
        date: '',
        sex: 'male',
        tel: '',
        email: '',
        address: ''
      });

      if (response.status === 201) {
        // Handle success
        setResponseStatus(response.status)
        console.log("Success:", data);
      } else {
        // Handle failure
        setResponseStatus(0)
        setCin('')
        console.error("Failure:", data);
      }
    } catch (error) {
      // Handle errors from the request itself (e.g., network errors, timeout errors)
      console.error("Error during the request:", error.message);
    }
  };


// update patient

const updatePat = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:5000/update_patient', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Extract data from the response
    const data = response.data;
    setResponseMessage(data.message);  // Assuming this is a function you've defined to set a response message
    setFormData({
      cin: '',
      name: '',
      date: '',
      sex: 'male',
      tel: '',
      email: '',
      address: ''
    });

    if (response.status === 201) {
      // Handle success
      setResponseStatus(response.status)
      console.log("Success:", data);
    } else {
      // Handle failure
      console.error("Failure:", data);
    }

  } catch (error) {
    // Handle errors from the request itself (e.g., network errors, timeout errors)
    console.error("Error during the request:", error.message);
  }
};


  return (
    <div>
      <h2 id='patients'>Patients</h2>

      <form className="form1" onSubmit={(e) => e.preventDefault()}>
        <h4>rechercher le patient:</h4>
        <div className="row">
          <input type="text" name="cin" placeholder="CIN" value={cin} required onChange={(e) => setCin(e.target.value)} />
          <button type="button" onClick={searchPat}>Recherche</button>
          <button type='button' onClick={deletePat}>Supprimer</button>
        </div>
      </form>

      <form className="form1" onSubmit={(e) => e.preventDefault()}>
        <h4>Ajouter un patient:</h4>
        <div className="row">
          <input type="text" name="cin" placeholder="CIN" value={formData.cin} required onChange={handleInputChange} />
          <input type="text" name="name" placeholder="Nom complete" value={formData.name} required onChange={handleInputChange} />
        </div>
        <div className="row">
          <label htmlFor="date">Date de Naissance:
            <input type="date" name="date" value={formData.date} required onChange={handleInputChange} />
          </label>
          <label htmlFor="sex">Sex:
            <select name="sex" id="sex" value={formData.sex} onChange={handleInputChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
        <div className="row">
          <input type="tel" name="tel" placeholder="Numero de telephone" value={formData.tel} required onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} required onChange={handleInputChange} />
        </div>
        <input type="text" name="address" placeholder="Address" value={formData.address} required onChange={handleInputChange} />
        <div className='row'>
          <button type="button" onClick={addPat}>Ajouter</button>
        <button type="button" onClick={updatePat}>Modifier</button>
        </div>
        
      </form>
      {responseMessage && responseStatus === 201 ? <p style={{ color: 'green', marginLeft: '30px' }}>{responseMessage}</p> : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}
    </div>
  )
}

export default Patients