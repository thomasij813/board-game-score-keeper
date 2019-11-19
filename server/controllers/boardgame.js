const Boardgame = require('../../db/models/boardgame.js');

const save = (req, res, next) => {
  Boardgame.find({ bggId: req.body.bggId }, function(err, docs) {
    if (err) {
      return res.status(500).send();
    }

    if (docs.length < 1) {
      const bg = new Boardgame(req.body);
      bg.save(function(err, doc) {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        res.status(201).json(doc);
      });
    } else {
      res.json(docs);
    }
  });
};

const getAll = (req, res, next) => {
  Boardgame.find({}, function(err, docs) {
    if (err) {
      return res.status(500).send();
    }

    res.json(docs);
  });
};

const getOne = (req, res, next) => {
  Boardgame.findOne({ bggId: req.params.bggId }, function(err, doc) {
    if (err) {
      return res.status(500).send();
    }

    res.json(doc);
  });
};

const addRound = (req, res, next) => {
  Boardgame.findOne({ bggId: req.params.bggId }, function(err, doc) {
    if (err) {
      return res.status(500).send();
    }

    doc.rounds.push({ finalScores: req.body });
    doc.save(function(err, doc) {
      if (err) {
        return res.status(500).send();
      }

      res.json(doc);
    });
  });
};

module.exports = {
  save,
  getAll,
  getOne,
  addRound
};
