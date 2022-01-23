//dependencies

const router = require('express').Router();
const dataSaved = require('../db/dataSaved');

//GET request

router.get('/notes', function (req, res) {
    
    dataSaved
        .returnNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//POST request

router.post('/notes', (req, res) => {

    dataSaved
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});