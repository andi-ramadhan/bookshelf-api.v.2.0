/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const { Op } = require('sequelize');
const Book = require('../models/books_data');
const User = require('../models/user');

exports.addBook = async (req, res) => {
  try{
    const { userId } = req.user;
    const newBook = {
      bookId: nanoid(),
      ...req.body,
      userId
    };

    const book = await Book.create(newBook);

    return res.status(201).json({
      status: 'success',
      message: 'Book added successfully',
      data: {
        BookId: book.bookId,
        UserId: book.userId,
        Title: book.title,
        DateAdded: book.insertedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  const { userId, role } = req.user;
  let { title, year, author, publisher, finished, reading } = req.query;

  try{
    if (title) {
      const booksByTitle = await Book.findAll ({
        where: {
          title: {
            [Op.iLike]: `%${title}%`
          }, 
          userId: userId
        }
      });

      if (booksByTitle.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `Books not found`,
        });
      }

      return res.json(booksByTitle);
    }

    if (year) {
      const booksByYear = await Book.findAll ({
        where: {
          year: year, userId: userId,
        }
      });

      if (booksByYear.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `Books with year ${year} not found`,
        });
      }

      return res.json(booksByYear);
    }

    if (author) {
      const booksByAuthor = await Book.findAll ({
        where: {
          author: {
            [Op.iLike]: `%${author}%`
          },
          userId: userId,
        }
      });

      if (booksByAuthor.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `Books with Author name ${author} not found`,
        });
      }

      return res.json(booksByAuthor);
    }

    if (publisher) {
      const booksByPublisher = await Book.findAll ({
        where: {
          publisher: {
            [Op.iLike]: `%${publisher}%`
          },
          userId: userId,
        }
      });

      if (booksByPublisher.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `Books with Publisher name ${publisher} not found`,
        });
      }

      return res.json(booksByPublisher);
    }

    if (finished !== undefined) {
      if(finished === 'true' || finished === '1') {
        finished = true;
      } else if (finished === 'false' || finished === '0') {
        finished = false;
      } else {
        return res.status(400).json({
          status: 'fail',
          message: 'Value must be a boolean (0, 1, true, false)'
        });
      }
      
      const booksByFinished = await Book.findAll({
        where: {
          finished: finished, userId: userId,
        }
      });

      if (booksByFinished.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `There is no book with ${finished} status`,
        });
      }

      return res.json(booksByFinished);
    }

    if (reading !== undefined) {
      if (reading === 'true' || reading === '1') {
        reading = true;
      } else if (reading === 'false' || reading === '0' ) {
        finished = false;
      } else {
        return res.status(400).json({
          status: 'fail',
          message: 'Value must be a boolean (0, 1, true, false)',
        });
      }

      const booksByReading = await Book.findAll({
        where: {
          reading: reading, userId: userId,
        }
      });

      if (booksByReading.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `There is no book with ${reading} status`,
        });
      }

      return res.json(booksByReading);
    }

    if(role === 'admin') {
      const books = await Book.findAll();
      return res.status(200).json(books);
    }
    
    const books = await Book.findAll({
      where: {
        userId: userId
      }
    });

    if (books.length === 0) {
      return res.status(200).json({
        message: 'No books found',
      });
    }

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user; 
  
  try {
    const book = await Book.findOne({ where: { bookId: id, userId: userId } });
  
    if(book) {
      return res.status(200).json({
        status: 'success',
        data: {
          book: book
        }
      });
    }

    if(role === 'admin') {
      const book = await Book.findOne({ where: { bookId: id } });
      return res.status(200).json({
        status: 'success',
        data: {
          book: book
        }
      });
    }
  
    return res.status(404).json({
      status: 'fail',
      message: `Book id not found`
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.editItemById = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { bookId: bodyId, ...bookData } = req.body;
  
  try {
    const [updated] = await Book.update(
      bookData,
      {
        where: { bookId: id, userId: userId }
      }
    );

    if (updated) {
      const updatedBook = await Book.findOne({ where: { bookId: id } });
      res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.user; 
  try {
    let deleted;
    if (role === 'admin') {
      deleted = await Book.destroy({
        where: { bookId: id },
      });
    } else {
      deleted = await Book.destroy({
        where: { bookId: id, userId: userId },
      });
    }

    if (deleted) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};