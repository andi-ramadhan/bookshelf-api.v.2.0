const { body, validationResult } = require('express-validator');

const validateBook = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
  body('year').isInt({ min: 0 }).withMessage('Year must be a non-negative number'),
  body('author').isString().withMessage('Author must be a string'),
  body('summary').isString().withMessage('Summary must be a string').notEmpty().withMessage('Summary is required'),
  body('publisher').isString().withMessage('Publisher must be a string'),
  body('pageCount').isInt({ min: 1 }).withMessage('Page count must be a non-negative number').notEmpty().withMessage('Page count is required'),
  body('reading').isBoolean().withMessage('Reading must be a boolean (true/false)').notEmpty().withMessage('Reading status is required'),
  body('readPage').isInt({ min: 0 }).withMessage('Read page must be a non-negative number').notEmpty().withMessage('Read page is required'),
  body('readPage').custom((value, { req }) => {
    if (value > req.body.pageCount) {
      throw new Error('Read page cannot be greater than page count');
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'fail',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = { validateBook };