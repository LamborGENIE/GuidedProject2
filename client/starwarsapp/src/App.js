import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import Home from './components/Home'
import Characters from './components/Characters'

function App() {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    let data = fetch('http://localhost:4000/characters');
    //console.log(data);
    data
      .then((res) => {
        return res.json()
      })
      .then((characters) => setCharacters(characters))
  }, []);

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home characters={characters}/>} />
        <Route path="/characters" element={<Characters characters={characters}/>} />
      </Routes>
    </div>
  );
}

export default App;
