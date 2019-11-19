const { Schema, model } = require('mongoose');

const roundSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  finalScores: {}
});

const boardgameSchema = new Schema({
  bggId: { type: Number, required: true, unique: true },
  title: String,
  thumbnail: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  yearpublished: Number,
  rounds: [roundSchema]
});

boardgameSchema.index({ bggId: 1, type: -1 });

const Boardgame = model('Boardgame', boardgameSchema);

module.exports = Boardgame;
