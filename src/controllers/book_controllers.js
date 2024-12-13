const { nanoid } = require('nanoid');
const Book = require('../models/books_data');
const { Op } = require('sequelize');

exports.addBook = async (req, res) => {
  try{
    const newBook = {
      id: nanoid(),
      ...req.body
    };

    const book = await Book.create(newBook);

    return res.status(201).json({
      status: 'success',
      message: 'Books added successfully',
      data: {
        BookId: book.id,
        BookName: book.name,
        DateAdded: book.insertedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const { name, year, author, publisher, finished, reading } = req.query;

  try{
    if (name) {
      const booksByName = await Book.FindAll ({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });

      if (booksByName.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: 'Items not found',
        });
      }

      return res.json(booksByName);
    }

    const books = await Book.findAll({ order: [['id']] });

    if (books.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Items not found',
      });
    }

    res.json(books);

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};