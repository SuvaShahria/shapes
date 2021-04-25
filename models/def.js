const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const defSchema = new Schema(
  {
    number: {
      type: Number,
      required: [true, 'required field'],
    },
    name: {
      type: String,
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

module.exports = mongoose.model('Def', defSchema);