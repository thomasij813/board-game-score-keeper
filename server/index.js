const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const bgg = require('./controllers/bgg.js');
const boardgame = require('./controllers/boardgame.js');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

app.use(express.static('dist'));
app.use(bodyParser.json());

app.get('/api/bgg/search', bgg.search);

app.post('/api/boardgame', boardgame.save);

app.get('/api/boardgame', boardgame.getAll);

app.get('/api/boardgame/:bggId', boardgame.getOne);

app.post('/api/boardgame/:bggId/round', boardgame.addRound);

app.delete('/api/boardgame/:bggId', boardgame.deleteOne);

app.get('/api/boardgame/:bggId/round/:roundId', boardgame.getOneRound);

// If an api request does not match above, send back 404
app.get('/api/*', (req, res, next) => {
  res.status(404).send('Resource not found');
});

// For all other requests, send back index.html and let
// react router handle potential 404
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
