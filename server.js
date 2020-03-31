const express = require('express');
const app = express();
const PORT = 80;

app.use(express.static('dist'));

app.get('/healthz', (req, res) => {
    res.send('I am fine!');
});

app.listen(PORT, () => console.log('App listening on port ${PORT}!'));