import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [temperature, setTemperature] = useState(0);

  useEffect(() => {
    async function getTemperature() {
      const res = await fetch("http://localhost:5000/temperature");
      res.json().then(res => setTemperature(res));
    }
    getTemperature();
  }, [])

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div>
        Current Temperature from server: {temperature} °C
      </div>
    </div>
  );
}

export default App;
