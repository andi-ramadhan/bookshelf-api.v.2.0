const { body, validationResult } = require('express-validator');

const validateBook = [
  body('name')
  .isString()
  .withMessage('Name must be a string')
  .notEmpty()
];