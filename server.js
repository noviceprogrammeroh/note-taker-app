//import libraries
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

//access the database json file
const db = require("./db/db.json");

//set your server port
const PORT = process.env.PORT || 3001;

//shortcut to access the express() method
const app = express();

//it uses JSON formatting
app.use(express.json());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,"./public")));

// GET should return the `index.html` file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
  console.log(res.status(200));
});

//notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//notes should return the notes.html file API
// GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  // res.json(db.slice(1));
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

//POST /api/notes` should receive a new note to save on the request body,
// add it to the `db.json` file, and then return the new note to the client.
//You'll need to find a way to give each note a unique id when
//it's saved (look into npm packages that could do this for you).

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    let userNote = req.body;
    //generate a random unique id
    userNote.id = uuidv4();
    notes.push(userNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) => {
      console.log(notes);
      res.json(userNote);
    });
  });
});

//delete note
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(
      (note) => note.id !== parseInt(req.params.id)
    );

    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err, data) => {
      if (err) throw err;
      if (res.json(data)) console.log("Successfully Deleted");
    });
  });
});

//listening port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
