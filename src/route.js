const express = require('express');
const router = express.Router();
const { getBooksHandler, addBookHandler, deleteBookHandler, getBookByIdHandler } = require('./handler')


router.get('/', getBooksHandler);
router.post('/', addBookHandler);
router.get('/:id', getBookByIdHandler);
router.delete('/:id', deleteBookHandler);

module.exports = router;