const express = require('express');
const router = express.Router();
const { getBooksHandler, addBookHandler, deleteBookHandler, getBookByIdHandler, editBookByIdHandler } = require('./handler')


router.get('/', getBooksHandler);
router.post('/', addBookHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', editBookByIdHandler);
router.delete('/:id', deleteBookHandler);

module.exports = router;