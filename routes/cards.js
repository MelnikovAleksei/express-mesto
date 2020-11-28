const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsDataFilePath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cardsDataFilePath, { encoding: 'utf8' }, (err, data) => {
    const newData = JSON.parse(data);

    if (err) {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }

    res.send(newData);
  });
});

module.exports = cardsRouter;
