const path = require('path');
const express = require('express');
const bgg = require('./controllers/bgg/bgg.js');

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

app.use(express.static('public'));

app.get('/api/bgg/search', bgg.search);

// If an api request does not match above, send back 404
app.get('/api/*', (req, res, next) => {
  res.status(404).send('Resource not found');
});

// For all other requests, send back index.html and let
// react router handle potential 404
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
