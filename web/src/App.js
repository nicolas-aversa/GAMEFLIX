import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Hacer una petición al backend
    axios.get('http://localhost:5000')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error("Error conectando con el backend", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>{message ? message : 'Conectando...'}</h1>
    </div>
  );
}

export default App;
