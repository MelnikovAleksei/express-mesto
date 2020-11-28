const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const usersDataFilePath = path.join(__dirname, '../data/users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(usersDataFilePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    }

    const newData = JSON.parse(data);

    res.send(newData);
  });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile(usersDataFilePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    }

    const newData = JSON.parse(data);

    const user = newData.find((item) => item._id === req.params.id);

    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }

    res.send(user);
  });
});

module.exports = usersRouter;
