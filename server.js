//dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//express server is created 

const app = express();
const PORT = process.env.PORT || 3001;



//setting Express app up to handle data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static('public'));



//API Route | "GET" request
app.get('/api/notes', function(req, res) {
    readFileAsync('./db/db.json', 'utf-8').then(function(data) {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
    })
});

//API Route | "POST" request
app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf-8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        writeFileAsync('./db/db.json', JSON.stringify(notes))
        res.json(note);
    })
});

//API Route | "DELETE" Request
app.delete('/api/notes/:id', function(req, res) {
    const deleteId = parseInt(req.params.id);
    readFileAsync('/db/db.json', 'utf-8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNoteData =[]
        for (let i = 0; i < notes.length; i++) {
            if(deleteId !== notes[i].id) {
                newNoteData.push(notes[i])
            }
            
        }  
             return newNoteData
    }).then(function(notes) {
        writeFileAsync('/db/db.json', JSON.stringify(notes))
    })
});

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


