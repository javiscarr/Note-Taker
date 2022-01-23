const { elementAt } = require("rxjs");

let noteTitle;
let noteText;
let savedNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
    noteTitle = document.querySelector('.note-title');
    noteText = document.querySelector('.note-textarea');
    savedNoteBtn = document.querySelector('.save-note');
    newNoteBtn = document.querySelector('.new-note');
    noteList = document.querySelectorAll('.list-container .list-group');


}


//function to show an element
const show = (elem) => {
    elem.style.display = 'inline';
};

//function to hide an element
const hide = (elem) => {
    elem.style.display = 'none';
};

