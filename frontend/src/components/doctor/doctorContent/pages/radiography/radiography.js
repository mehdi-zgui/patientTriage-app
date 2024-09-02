import React, { useState } from 'react';
import './radiography.css';

function Radiography() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/radiographie', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        setImageUrl(`http://localhost:5000/display/${data.filename}`);
        setError('');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h2 id='Radiography'>Radiography</h2>
      <form className='rad' onSubmit={handleSubmit}>
        <h4>Sélectionnez le fichier dont vous souhaitez un rapport:</h4>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Ajouter</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && (
        <p style={{ color: prediction === 'Pneumonia' ? 'red' : 'green' }}>
          Prédiction : {prediction}
        </p>
      )}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />}
    </div>
  );
  
}

export default Radiography;
