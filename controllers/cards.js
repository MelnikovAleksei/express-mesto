const path = require('path');

const cardsDataFilePath = path.join(__dirname, '../data/cards.json');

const getJson = require('../helpers/readJson');

const getCards = async (req, res) => {
  try {
    const data = await getJson(cardsDataFilePath);

    if (!data) {
      res.status(404).send({ message: 'Карточки не найдены' });
      return;
    }

    res.status(200).send(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
};

module.exports = getCards;
