const express = require('express');
const router = express.Router();
const {
  getBooksHandler,
  addBookHandler,
  deleteBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  bulkAddBooksHandler
} = require('./handler')

const { validateBook } = require('./validator');
const { validateBulkBooks } = require('./bulk-validator');

router.get('/', getBooksHandler);
router.post('/', validateBook, addBookHandler);
router.post('/bulk-add', validateBulkBooks, bulkAddBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', validateBook, editBookByIdHandler);
router.delete('/:id', deleteBookHandler);

module.exports = router;