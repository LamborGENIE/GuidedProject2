import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import Characters from './components/Characters';

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
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label for="searchString">Who you looking for? <span class="small">(Regular expressions are cool
          here)</span></label>
        <input id="searchString" oninput="filterCharacters()" autocomplete="off" />
      </div>
      <Characters characters={characters}/>
    </div>
  );
}

export default App;
