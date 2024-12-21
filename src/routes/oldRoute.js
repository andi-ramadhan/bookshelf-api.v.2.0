// This code is not used anymore, but I keep it for reference.

const express = require('express');
const router = express.Router();
const {
  getBooksHandler,
  addBookHandler,
  deleteBookHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  bulkAddBooksHandler
} = require('../controlles/handler')

const { validateBook } = require('../config/validator');
const { validateBulkBooks } = require('../config/bulk-validator');

router.get('/', getBooksHandler);
router.post('/', validateBook, addBookHandler);
router.post('/bulk-add', validateBulkBooks, bulkAddBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', validateBook, editBookByIdHandler);
router.delete('/:id', deleteBookHandler);

module.exports = router;