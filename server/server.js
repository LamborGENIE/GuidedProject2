

const express = require('express');
//const dao = require("./data_access");
const app = express();
app.use(express.json()); //Parse JSON body


const mongodb = require("mongodb"); // mongo client library  
const { MongoClient, ObjectID } = require('mongodb');
const url = "mongodb://localhost:27017";
const dbName = "swapi";

let collection_film_characters
let collection_film_planets
let collection_films
let collection_characters
let collection_planets

async function startup() {
    let client = new MongoClient(url);
    await client.connect();
    var db = client.db(dbName)

    collection_film_planets = db.collection("films_planets");
    collection_film_characters = db.collection("films_characters");
    collection_films = db.collection("films");
    collection_characters = db.collection("characters");
    collection_planets = db.collection("planets");
}
startup();

app.get("/films", (req, res) => {
    let data = collection_films.find().toArray();
    data.then(films => res.send(films));
});

app.get("/characters", (req, res) => {
    let data = collection_characters.find().toArray();
    data.then(characters => res.send(characters));
});

app.get("/planets", (req, res) => {
    let data = collection_planets.find().toArray();
    data.then(planets => res.send(planets));
});

app.get("/film_characters", (req, res) => {
    let data = collection_film_characters.find().toArray();
    data.then(film_characters => res.send(film_characters));
});

app.get("/film_planets", (req, res) => {
    let data = collection_film_planets.find().toArray();
    data.then(film_planets => res.send(film_planets));
});

const port = 4000
console.log("Open a browser to http://localhost:" + port + " to view the application");
app.listen(port);