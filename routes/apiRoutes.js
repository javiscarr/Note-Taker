//dependencies

const router = require('express').Router();
const dataSaved = require('../db/dataSaved');

//GET request

router.get('/api/notes', function (req, res) {
    
    dataSaved
        .returnNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

//POST request

router.post('/api/notes', (req, res) => {

    dataSaved
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

//DELETE request
router.delete('/api/notes/:id', function (req, res) {
    
    dataSaved
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true}))
        .catch(err => res.status(500).json(err));
});