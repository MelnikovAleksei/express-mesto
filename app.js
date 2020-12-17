const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const notFountRouter = require('./routes/notFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cardsRoutes);

app.use('/', usersRoutes);

app.all('*', notFountRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
