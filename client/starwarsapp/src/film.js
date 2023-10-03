let producer;
let title;
let episode_id;
let director;
let release_date;
let opening_crawl;
let character_listUl;
let planet_listUll

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    producer = document.querySelector('span#producer');
    title = document.querySelector('span#title');
    episode_id = document.querySelector('span#episode_id');
    director = document.querySelector('span#director');
    release_date = document.querySelector('span#release_date');
    opening_crawl = document.querySelector('span#opening_crawl');
    character_listUl = document.querySelector('#characters>ul');
    planet_listUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });
  
  async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id);
      film.character_list = await fetchCharacterList(film);
      film.planet_list = await fetchPlanetList(film);
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }
  async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
      .then(res => res.json())
  }

  async function fetchCharacterList(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const character_list = await fetch(url)
      .then(res => res.json())
    return character_list;
  }

  async function fetchPlanetList(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planet_list = await fetch(url)
      .then(res => res.json())
    return planet_list;
  }

  const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    producer.textContent = film?.producer;
    title.textContent = film?.title;
    episode_id.textContent = film?.episode_id;
    director.textContent = film?.director;
    release_date.textContent = film?.release_date;
    opening_crawl.textContent = film?.opening_crawl;
    const character_list = film?.character_list?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    const planet_list = film?.planet_list?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)

    character_listUl.innerHTML = character_list.join("");
    planet_listUl.innerHTML = planet_list.join("");
  }