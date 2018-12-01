/**
 * Dependencies
 */
const bcrypt = require('bcrypt');
const { Conflict, NotFound } = require('http-errors');
const { UserModel } = require('../models');

async function registerUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  const passwordSalt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, passwordSalt);

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw Conflict('A resource already exists');
  }

  const newUser = new UserModel({
    firstName,
    lastName,
    email,
    password: passwordHash
  });

  return newUser.save();
};

async function authenticateUser(req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }, 'password');

  if (!user) {
    throw NotFound('User does not exist or invalid credentials');
  } else if (user && bcrypt.compareSync(password, user.password)) {
    const token = this.jwt.sign({ email, userID: user.id });

    return { token };
  }
};

async function listUsers(req, res) {
  return UserModel.find();
}

module.exports = { registerUser, authenticateUser, listUsers };
