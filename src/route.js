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


router.get('/', getBooksHandler);
router.post('/', addBookHandler, bulkAddBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', editBookByIdHandler);
router.delete('/:id', deleteBookHandler);

module.exports = router;