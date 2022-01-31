//dependencies
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const stored = require('../db/stored');


module.exports = app => {

    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        //GET request

app.get('/notes',  (req, res) => {
    
     res.json(notes);
            
        })

        .catch((err) => res.status(500).json(err));

//POST request

app.post('/api/notes', (req, res) => {

    let newNote = req.body;
    notes.push(newNote);
    updatedDb();
    return console.log("Added new note: "+newNote.title);
});


//Returns a specific note
app.get('/api/notes:id', (req, res) => {
        
    res.json(notes[req.params.id]);
});


//DELETE request
app.delete('/api/notes/:id', (req, res) => {
    
    notes.splice(req.params.id, 1);
    updatedDb();
    console.log("Deleted note with id "+req.params.id);
});

    })
}



