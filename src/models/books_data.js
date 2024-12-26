const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { nanoid } = require('nanoid');

const Book = sequelize.define('books_data', {
  bookId: {
    type: DataTypes.STRING,
    defaultValue: () => nanoid(),
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users', // Name of the users table
      key: 'userId' // Column name in users table
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    defaultValue: 'no summary'
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pageCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  readPage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max(value) {
        if (value > this.pageCount) {
          throw new Error("readPage cannot be greater than pageCount");
        }
      }
    }
  },
  finished: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  reading: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  insertedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  createdAt: 'insertedAt',
  updatedAt: 'updatedAt',
  hooks: {
    beforeSave: (book) => {
      book.finished = book.readPage === book.pageCount;
    }
  }
});

module.exports = Book;