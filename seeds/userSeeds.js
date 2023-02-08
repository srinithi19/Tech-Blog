const { User } = require('../models');

const userData = [
  {
    name: 'Sam',
    password: 'password1',
  },
  {
    name: 'John',
    password: 'password2',
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, { individualHooks: true});

module.exports = seedUsers;