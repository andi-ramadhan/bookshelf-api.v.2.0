const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const User = sequelize.define('users', {
  userId: {
    type: DataTypes.STRING,
    defaultValue: () => nanoid(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      len: {
        args: [8, 255]
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
  }
}, 
// If you want to hash the password before saving it to the database (hashing on database side)

// {
//   hooks: {
//     beforeCreate: async (user) => {
//       user.password = await bcrypt.hash(user.password, 10);
//     }
//   }
// }
);

module.exports = User;