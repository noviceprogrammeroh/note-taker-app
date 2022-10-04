//import libraries
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const api = require("./public/assets/js/index.js");
const db = require("./db/db.json");

//set your server port
const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));

//On the back end, the application should include a `db.json`
// file that will be used to store and retrieve notes using the `fs` module.
fs.readFile(db, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const parsedNotes = JSON.parse(data);

    // parsedNotes.push();
  }
});

//notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
  console.log(res.status(200));
});


// GET should return the `index.html` file.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.log(res.status(200));
  });


// GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
 app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.status(200).json(`${req.method} request received to get reviews`);
  
 //POST /api/notes` should receive a new note to save on the request body,
 // add it to the `db.json` file, and then return the new note to the client. 
 //You'll need to find a way to give each note a unique id when 
 //it's saved (look into npm packages that could do this for you).

 app.post("/api/notes", (req, res) => {
    fs.writeFile(
        db,
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated db.json!')

      );

  });

  
  //listening port
app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);
});
