const { Sequilize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequilize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
  }
);

module.exports = sequelize;