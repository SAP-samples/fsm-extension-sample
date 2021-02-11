require('dotenv').config();

const PORT = process.env.PORT || 80;

var express = require('express')
  , backend = require('./backend');

const app = express();

app.use(backend.initialize());
app.use(express.static('frontend'));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));