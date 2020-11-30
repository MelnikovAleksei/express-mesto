const path = require('path');

const usersDataFilePath = path.join(__dirname, '../data/users.json');

const getJson = require('../helpers/readJson');

const getUsers = async (req, res) => {
  try {
    const data = await getJson(usersDataFilePath);

    if (!data) {
      res.status(404).send({ message: 'Пользователи не найдены' });
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

const getUserById = async (req, res) => {
  try {
    const data = await getJson(usersDataFilePath);

    if (!data) {
      res.status(404).send({ message: 'Пользователи не найдены' });
      return;
    }

    const user = data.find((item) => item._id === req.params.id);

    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }

    res.status(200).send(user);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      return;
    }
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
