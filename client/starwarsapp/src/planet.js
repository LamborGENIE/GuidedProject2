let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let filmsUl;
let charactersUl;


const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');
  climateSpan = document.querySelector('span#climate');
  surfaceWaterSpan = document.querySelector('span#surface_water');
  diameterSpan = document.querySelector('span#diameter');
  rotationPeriodSpan = document.querySelector('span#rotation_period');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan = document.querySelector('span#gravity');
  orbitalPeriodSpan = document.querySelector('span#orbital_period');
  populationSpan = document.querySelector('span#population');
  charactersUl = document.querySelector('#characters>ul')
  filmsUl = document.querySelector('#films>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.films = await fetchFilms(planet)
    planet.characters = await fetchCharacters(planet)
  }
  catch (ex) {
    console.error(`Error reading character ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchFilms(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/films`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }
  async function fetchCharacters(planet) {
    const url = `${baseUrl}/planets/${planet?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }


const renderPlanet = planet => {
    console.log(planet);
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  climateSpan.textContent = planet?.climate;
  surfaceWaterSpan.textContent = planet?.surface_water;
  diameterSpan.textContent = planet?.diameter;
  rotationPeriodSpan.textContent = planet?.rotation_period;
  terrainSpan.textContent = planet?.terrain;
  gravitySpan.textContent = planet?.gravity;
  orbitalPeriodSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsLis.join("");
  const characterLis = planet?.characters?.map(char => `<li><a href="/character.html?id=${char.id}">${char.name}</li>`)
  charactersUl.innerHTML = characterLis.join("");

}
