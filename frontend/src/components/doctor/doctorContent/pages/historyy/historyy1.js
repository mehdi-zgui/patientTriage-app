import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import './historyy1.css'
import Popup from '../../../../popup'

function Historyy1() {

  const [cin, setCin] = useState('')
  const [consults, setConsults] = useState([])
  const [responseStatus, setResponseStatus] = useState(0);
  const [responseMessage, setResponseMessage] = useState('');
  const [page, pageChange] = useState(0)
  const [openPopup, setOpenPopup] = useState(false)
  const [content, setContent] = useState({})

  function handlePageChange(event, newPage) {
    pageChange(newPage)
  }


  // search by patient

  const searchPatConsult = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:5000/search_consultations_patient', {
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
        setConsults(data.reverse());
        setCin('')
        pageChange(0)
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_consultations');

        const data = response.data;
        console.log(data);
        setResponseMessage(data.message);

        if (response.status === 201) {
          setConsults(data.reverse());
          setResponseStatus(response.status);
          console.log("Success:", data);
        } else {
          console.error("Failure:", data);
        }
      } catch (error) {
        console.error("Error during the request:", error.message);
      }
    }

    fetchData();
  }, []);


  return (
    <div >
      <h2 id='history1'>Histore des Patients</h2>

      <form className="serchConsu1" onSubmit={searchPatConsult}>
        <h4>Recherche consultations de patient:</h4>
        <div className="row2">
          <input type="text" name="cin" placeholder="CIN" value={cin} required onChange={(e) => setCin(e.target.value)} />
          <button type="submit">Recherche</button>
        </div>
      </form>

      <Paper sx={{ width: '95%', marginLeft: '2%' }} style={{ borderRadius: '10px' }}>
        <TableContainer style={{ borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>consultation_id</TableCell>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>cin_patient</TableCell>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>date_consultation</TableCell>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>diagnostic</TableCell>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>maladie</TableCell>
                <TableCell style={{ backgroundColor: 'rgb(0, 217, 255)', color: 'white' }}>Plus_infos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consults && consults
                .slice(page * 4, page * 4 + 4)
                .map((consult, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{consult.consultation_id}</TableCell>
                      <TableCell>{consult.cin_patient}</TableCell>
                      <TableCell>{new Date(consult.date_consultation).toISOString().slice(0, 10)}</TableCell>
                      <TableCell>{consult.diagnostic === '1'
                        ? <p style={{ color: 'red' }}>Emergency</p>
                        : (consult.diagnostic === '2' || consult.diagnostic === '3')
                          ? <p style={{ color: 'orange' }}>Urgent</p>
                          : <p style={{ color: 'green' }}>Non-urgent</p>
                      }</TableCell>
                      <TableCell>{consult.disease}</TableCell>
                      <TableCell><button className='btnh' onClick={() => {
                        setContent(consult)
                        setOpenPopup(true)
                      }}>Voir_Plus</button></TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={4}
          count={consults.length}
          page={page}
          rowsPerPage={4}
          component='div'
          onPageChange={handlePageChange}
        >
        </TablePagination>
      </Paper>
      {responseMessage && responseStatus === 201 ? <p style={{ color: 'green', marginLeft: '30px' }}>{responseMessage}</p> : <p style={{ color: 'red', marginLeft: '30px' }}>{responseMessage}</p>}
      <Popup
        open={openPopup}
        setopen={setOpenPopup}
        consult={content}
      >
      </Popup>
    </div>
  )
}

export default Historyy1