const { User } = require('../models');

const userData = [
  {
    name: 'Sam',
    email: 'sam@gmail.com',
    password: 'password1',
  },
  {
    name: 'John',
    email: 'john@gmail.com',
    password: 'password2',
  },
];

const seedUsers = () =>
  User.bulkCreate(userData, { individualHooks: true});

module.exports = seedUsers;