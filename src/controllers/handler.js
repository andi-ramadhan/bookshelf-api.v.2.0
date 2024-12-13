const { nanoid } = require('nanoid')
const books = require('../config/database')

const getBooksHandler = (req, res) => {
  const { name, year, author, publisher } = req.query;
  let filteredBooks = books;

//Query Path Request
  if (name) {
    filteredBooks = filteredBooks.filter((book) => 
      book.name && book.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!filteredBooks.length) {
      return res.status(404).json({
        status: 'fail',
        message: `Book with name ${name} not found`,
      });
    }
  }

  if (year) {
    const yearNumber = Number(year);
    filteredBooks = filteredBooks.filter((book) => book.year === yearNumber);

    if (!filteredBooks.length) {
      return res.status(404).json({
        status: 'fail',
        message: `Book with year ${year} not found`,
      });
    }
  }

  if (author) {
    filteredBooks = filteredBooks.filter((book) => 
      book.author && book.author.toLowerCase().includes(author.toLowerCase())
    );

    if (!filteredBooks.length) {
      return res.status(404).json({
        status: 'fail',
        message: `Book with publisher ${author} not found`,
      });
    }
  }

  if (publisher) {
    filteredBooks = filteredBooks.filter((book) => 
      book.publisher && book.publisher.toLowerCase().includes(publisher.toLowerCase())
    );

    if (!filteredBooks.length) {
      return res.status(404).json({
        status: 'fail',
        message: `Book with publisher ${publisher} not found`,
      });
    }
  }
  

  return res.json({
    status: 'success',
    data: {
      books: filteredBooks
    }
  });
};

const addBookHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  };

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

const bulkAddBooksHandler = (req, res) => {
  const requests = req.body;

  if (!Array.isArray(requests)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body must be an array'
    });
  }

  const errors = [];
  const successfulBooks = [];

  requests.forEach(requestData => {
    const { name, year, author, summary, reading, publisher } = requestData; 
    
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = { id, name, year, author, summary, publisher, reading, insertedAt, updatedAt };
    
    books.push(newBook);
    successfulBooks.push(newBook);
  });

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'partial',
      message: 'Some books failed to add',
      errors: errors,
      successfulBooks: successfulBooks
    });
  }

  res.status(201).json({
    status: 'success',
    message: 'Books added successfully',
    data: successfulBooks
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

const editBookByIdHandler = (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const bookIndex = books.findIndex((book) => book.id === id);

  if(bookIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: `Book with id ${id} not found`
    });
  }


  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({
    status: 'success',
    message: `Book updated successfully`,
    data: books[bookIndex]
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

module.exports = {
  getBooksHandler,
  addBookHandler,
  deleteBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  bulkAddBooksHandler
};