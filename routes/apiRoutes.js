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

//DELETE request
router.delete('/api/notes/:id', function (req, res) {
    
    stored
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true}))
        .catch(err => res.status(500).json(err));
});

    })
}



module.exports = router;