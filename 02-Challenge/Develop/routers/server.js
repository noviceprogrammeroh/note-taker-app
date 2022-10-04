const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const api = require('../public/assets/js/index.js');


//set your server port
const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use("insert something");