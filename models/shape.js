const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shapeSchema = new Schema(
  {
    id: {
      type: Number,
      required: [true, 'required field'],
    },
    shape: {
      type: String,
      required: [true, 'required field'],
    },
    createdBy: {
      type: String,
      required: [true, 'required field'],
    },
    modifiedBy: {
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

module.exports = mongoose.model('Shape', shapeSchema);