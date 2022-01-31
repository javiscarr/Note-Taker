//dependencies

const fs = require('fs');
const util = require('util');
const uuidv4  = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Stored {

    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf-8');
    }

    getNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text} = note;
        if (!title || !text) {
            throw new Error('Title and text areas can not be left blank!');
        }

        //creates a unique ID for each note using UUID 
        const newNote = { title, text, id: uuidv4() };

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    //deletes a note

    deleteNotes(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));

    }
}

module.exports = new Stored();
