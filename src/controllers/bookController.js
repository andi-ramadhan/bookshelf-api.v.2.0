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
      message: 'Book added successfully',
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
  let { name, year, author, publisher, finished, reading } = req.query;

  try{
    if (name) {
      const booksByName = await Book.findAll ({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        }
      });

      if (booksByName.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `Books with name ${name} not found`,
        });
      }

      return res.json(booksByName);
    }

    if (year) {
      const booksByYear = await Book.findAll ({
        where: {
          year: year,
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
          name: {
            [Op.iLike]: `%${author}%`
          }
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
          name: {
            [Op.iLike]: `%${publisher}%`
          }
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
          finished: finished
        }
      });

      if (booksByFinished.length === 0) {
        return res.status(404).json({
          status: 'fail',
          message: `There is no book with ${finished} status`,
        });
      }
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
          reading: reading
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

    const books = await Book.findAll({ order: [['id']] });

    if (books.length === 0) {
      return res.status(404).json({
        books: books,
      });
    }

    res.json(books);

  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};