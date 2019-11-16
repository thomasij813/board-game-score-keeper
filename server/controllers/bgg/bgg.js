const rp = require('request-promise');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

const mapBggXmlToJson = xml => {
  if (!xml.items || !xml.items.item) {
    return [];
  }

  return xml.items.item.map(game => {
    const obj = { id: game.$.id };

    if (game.yearpublished && game.yearpublished[0]) {
      obj.yearpublished = game.yearpublished[0].$.value;
    }

    if (game.name && game.name[0]) {
      obj.name = game.name[0].$.value;
    }

    return obj;
  });
};

const search = async (req, res, next) => {
  const uri = 'http://www.boardgamegeek.com/xmlapi2/search';
  const qs = {
    query: req.query.query,
    type: 'boardgame'
  };

  try {
    const bggXml = await rp.get({ uri, qs });
    const data = await parser.parseStringPromise(bggXml).then(mapBggXmlToJson);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { search };
