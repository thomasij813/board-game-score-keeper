const rp = require('request-promise');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const mapBggDetails = data => {
  if (!data.items || !data.items.item) {
    return [];
  }

  return data.items.item.map(game => {
    const obj = { bggId: parseInt(game.$.id) };

    if (game.thumbnail && game.thumbnail[0]) {
      obj.thumbnail = game.thumbnail[0];
    }

    if (game.image && game.image[0]) {
      obj.image = game.image[0];
    }

    if (game.description && game.description[0]) {
      obj.description = game.description[0];
    }

    if (game.yearpublished && game.yearpublished[0]) {
      obj.yearpublished = parseInt(game.yearpublished[0].$.value);
    }

    if (game.name && game.name[0]) {
      obj.title = game.name[0].$.value;
    }

    return obj;
  });
};

const addBgDetails = async listOfBoardgames => {
  if (listOfBoardgames.length === 0) {
    return [];
  }
  const idSearchString = listOfBoardgames.join(',');

  const uri = 'http://www.boardgamegeek.com/xmlapi2/thing';
  const qs = {
    id: idSearchString
  };

  try {
    const bggXml = await rp.get({ uri, qs });
    const data = await parser.parseStringPromise(bggXml).then(mapBggDetails);
    return data;
  } catch (error) {
    throw error;
  }
};

const search = async (req, res, next) => {
  const uri = 'http://www.boardgamegeek.com/xmlapi2/search';
  const qs = {
    query: req.query.query,
    type: 'boardgame'
  };

  try {
    const bggXml = await rp.get({ uri, qs });
    const parsedData = await parser.parseStringPromise(bggXml);
    const ids =
      !parsedData.items || !parsedData.items.item
        ? []
        : parsedData.items.item.map(game => game.$.id);

    const details = await addBgDetails(ids);
    res.json(details);
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
