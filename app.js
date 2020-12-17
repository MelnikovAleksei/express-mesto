const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const path = require('path');

const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const notFountRouter = require('./routes/notFound');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use('/', cardsRoutes);

app.use('/', usersRoutes);

app.all('*', notFountRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
