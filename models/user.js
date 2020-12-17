const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return !/([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?\[\]!$'()\*,;@%&+~#=]+)?/g.test(v); //regexr.com/3ajfi + [] ! $ ' ( ) *,;
      }
    }
  }
})

module.exports = mongoose.model('user', userSchema);