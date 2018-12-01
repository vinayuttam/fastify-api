/**
 * Dependencies
 */
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  firstName: {
    required: true,
    trim: true,
    type: String,
  },
  lastName: {
    required: true,
    trim: true,
    type: String,
  },
  email: {
    required: true,
    trim: true,
    type: String,
  },
  password: {
    required: true,
    trim: true,
    type: String,
  },
});

module.exports = model('User', UserSchema);

