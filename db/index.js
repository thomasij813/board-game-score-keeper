const mongoose = require('mongoose');

try {
  mongoose.connect('mongodb://localhost:27017/boardgame-tracker', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });
} catch (error) {
  console.error('Error connecting to mongoose', error.message);
}
