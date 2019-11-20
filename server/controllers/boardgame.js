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

const deleteOne = (req, res, next) => {
  Boardgame.deleteOne({ bggId: req.params.bggId }, function(err, doc) {
    if (err) {
      return res.status(500).send();
    }

    res.status(204).redirect('/');
  });
};

const getOneRound = (req, res, next) => {
  Boardgame.findOne({ bggId: req.params.bggId }, function(err, doc) {
    if (err) {
      return res.status(500).send();
    }

    if (!doc || doc.rounds.length < 1) {
      return res.status(400).send();
    }

    const data = doc.rounds.id(req.params.roundId);
    return data ? res.json(data) : res.status(400).send();
  });
};

module.exports = {
  save,
  getAll,
  getOne,
  addRound,
  deleteOne,
  getOneRound
};
