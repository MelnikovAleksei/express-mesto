const cardsRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const cardsDataFilePath = path.join(__dirname, '../data/cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cardsDataFilePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      return;
    }

    const newData = JSON.parse(data);

    res.send(newData);
  });
});

module.exports = cardsRouter;
