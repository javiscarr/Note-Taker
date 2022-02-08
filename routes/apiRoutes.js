//dependencies
const { json } = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  //GET request

  app.get("/api/notes", (req, res) => {
    console.log("\n\nExecuting GET notes request");

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    console.log("\nGet request - Returning notes: " + JSON.stringify(data));

    res.json(data);
  });

  //POST request

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;

    console.log("\n\nPOST request - New Note: " + JSON.stringify(newNote));

    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    data.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data));

    console.log("\nYou have successfully added a new note!");

    res.json(data);
  });

  //DELETE request
  app.delete("/api/notes/:id", (req, res) => {
    let noteId = request.params.id.toString();

    console.log(`\n\nDELETE note request for noteId: ${noteId}`);

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const newData = data.filter((note) => note.id.toString() !== noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(newData));

    console.log(`\nYou have successfully deleted note with the id : ${noteId}`);

    res.json(newData);
  });
};
