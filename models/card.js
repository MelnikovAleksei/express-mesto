const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlegth: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/.test(v);
      },
      message: 'Ошибка валидации url адреса',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('card', cardSchema);
