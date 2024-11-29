const { nanoid } = require('nanoid');
const books = require('./data')

const getBooksHandler = (req, res) => {
  res.json({
    status: 'success',
    data: {
      books: books
    }
  });
};

const addBookHandler = (req, res) => {
  const { name, publisher } = req.body;

  if(!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Failed to add book. Please add a book name',
    });
  }
  
  if(!publisher) {
    return res.status(400).json({
      status: 'fail',
      message: 'Failed to add book. Please add a book publisher',
    });
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { id, name, publisher, insertedAt, updatedAt };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === id);

  if(isSuccess){
    return res.status(201).json({
      status: 'success',
      message: 'Book added successfully',
      data: {
        BookId: id,
        BookName: name,
        DateAdded: insertedAt
      }
    });  
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Failed to add book, an unexpected error occured',
  });
};

const getBookByIdHandler = (req, res) => {
  const { id } = req.params; // Access the 'id parameter from the request

  const book = books.find((book) => book.id === id);

  if (book) {
    return res.status(200).json({
      status: 'success',
      data: {
        book: book
      }
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: `Book with id ${id} not found`
  });
};

const deleteBookHandler = (req, res) => {
  const { id } = req.params; // this access the route parameter to request get an id from there

  // the logic to find the books id and delete it with those id
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      message: `Book with id ${id} deleted successfully`
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: `Book with id ${id} not found`
  });

};

module.exports = { getBooksHandler, addBookHandler, deleteBookHandler, getBookByIdHandler };