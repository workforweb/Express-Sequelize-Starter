const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('users', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User must have a firstname' },
      notEmpty: { msg: 'firstname must not be empty' },
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User must have a lastname' },
      notEmpty: { msg: 'lastname must not be empty' },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'User must have a email' },
      notEmpty: { msg: 'Email must not be empty' },
      isEmail: { msg: 'Must be a valid email' },
    },
  },
});

module.exports = User;
