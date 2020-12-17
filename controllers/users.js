const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Ошибка валидации: ${err}` });
        return;
      }
      res.status(500).send({ message: `Внутренняя ошибка сервера: ${err}` });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser
};
