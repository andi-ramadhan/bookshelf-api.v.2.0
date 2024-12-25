const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook, validateUpdateBook } = require('../middleware/validator');
const { authenticateToken } = require('../middleware/auth');

router.get('/books', authenticateToken, bookController.getAllBooks);
router.get('/books/:id', authenticateToken, bookController.getBookById);
router.post('/books', authenticateToken, validateBook,bookController.addBook);
router.put('/books/:id', authenticateToken, validateUpdateBook, bookController.editItemById);
router.delete('/books/:id', authenticateToken, bookController.deleteBookById);

module.exports = router;