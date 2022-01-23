//dependencies

const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {

    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    read() {
        return readNote('db/db.json', 'utf-8');
    }

    returnNotes() {
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

        return this.returnNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    //deletes a note

    deleteNotes(id) {
        return this.returnNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));

    }
}

module.exports = new Save();
