const express = require('express');
const bgg = require('./controllers/bgg/bgg.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/bgg/search', bgg.search);

app.listen(port, () => console.log(`Listening on port ${port}`));
