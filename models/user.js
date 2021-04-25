const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'required field'],
    },
    password: {
      type: String,
      required: [true, 'required field'],
    },
    number: {
      type: Number,
      required: [true, 'required field'],
    },
  },
  {
    timestamp: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

module.exports = mongoose.model('User', userSchema);