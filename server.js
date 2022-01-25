//dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const uuid = require("uuid");


//const readFileAsync = util.promisify(fs.readFile);
//const writeFileAsync = util.promisify(fs.writeFile);

//express server is created 

const app = express();
const PORT = process.env.PORT || 3001;



//setting Express app up to handle data parsing
//static middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



//API Route | "GET" request
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))

});

//API Route | "POST" request
app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('/db/db.json'));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
        notes.push(newNotes);
        fs.writeFileAsync('./db/db.json', JSON.stringify(notes))
        res.json(notes);
});

//API Route | "DELETE" Request
app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const deleteNote = notes.filter((dltNote) => dltNote.id !== req.params.id);;
    fs.readFileSync('./db/db.json', JSON.stringify(dltNote));
    res.json(dltNote);
        
        
//HTML Routes

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});




//Listen

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});


