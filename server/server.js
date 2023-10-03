
var cors = require('cors');
const express = require('express');
//const dao = require("./data_access");
const app = express();
app.use(express.json()); //Parse JSON body
app.use(cors()); 


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

app.get("/films/:id", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_films.findOne({ "id": id })
            .then(film => res.send(film));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/films/:id/characters", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_film_characters.find({ "film_id": id }).toArray()
            .then(characters => res.send(characters));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/films/:id/planets", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_film_planets.find({ "film_id": id }).toArray()
            .then(planets => res.send(planets));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/characters", (req, res) => {
    let data = collection_characters.find().toArray();
    data.then(characters => res.send(characters));
});

app.get("/characters/:id", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_characters.findOne({ "id": id })
            .then(character => res.send(character));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/characters/:id/films", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_film_characters.find({ "character_id": id }).toArray()
            .then(film => res.send(film));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/planets", (req, res) => {
    let data = collection_planets.find().toArray();
    data.then(planets => res.send(planets));
});

app.get("/planets/:id", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_planets.findOne({ "id": id })
            .then(planet => res.send(planet));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
});

app.get("/planets/:id/films", async (req, res) => {
    try {
        let id = +req.params.id;
        await collection_film_planets.find({ "planet_id": id }).toArray()
            .then(film => res.send(film));
    }
    catch (error) { res.status(500).send("Internal Server Error") }
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