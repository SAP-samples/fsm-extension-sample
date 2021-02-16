require('dotenv').config();
const path = require('path');

const PORT = process.env.PORT || 80;

var express = require('express')
  , backend = require('./backend');

const app = express();

app.use(backend.initialize());

// Deliver static files as frontend
app.use(express.static('frontend'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));