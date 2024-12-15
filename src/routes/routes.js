const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook } = require('../config/validator');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateBook,bookController.addBook);
router.put('/:id', bookController.editItemById);
router.delete('/:id', bookController.deleteBookById);

module.exports = router;