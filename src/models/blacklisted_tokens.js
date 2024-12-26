const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BlacklistedToken = sequelize.define('blacklisted_tokens', {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  blacklisted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'blacklisted_tokens',
  timestamps: false,
});

module.exports = BlacklistedToken;