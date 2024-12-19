const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const User = sequelize.define('users', {
  userId: {
    type: DataTypes.STRING,
    defaultValue: () => nanoid(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [8, 255],
        msg: "Password must be at least 8 characters long"
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

module.exports = User;