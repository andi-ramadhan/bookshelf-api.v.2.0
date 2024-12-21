// This code is not used anymore, but I keep it for reference.

const { body, validationResult } = require('express-validator');

const validateBulkBooks = [
  (req, res, next) => {
    const validationChain = req.body.flatMap((book, index) => [
      body(`${index}.name`).isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
      body(`${index}.year`).isInt({ min: 0 }).withMessage('Year must be a non-negative number'),
      body(`${index}.author`).isString().withMessage('Author must be a string'),
      body(`${index}.summary`).isString().withMessage('Summary must be a string').notEmpty().withMessage('Summary is required'),
      body(`${index}.publisher`).isString().withMessage('Publisher must be a string'),
      body(`${index}.pageCount`).isInt({ min: 1 }).withMessage('Page count must be a non-negative number').notEmpty().withMessage('Page count is required'),
      body(`${index}.reading`).isBoolean().withMessage('Reading must be a boolean (true/false)').notEmpty().withMessage('Reading status is required'),
      body(`${index}.readPage`).isInt({ min: 0 }).withMessage('Read page must be a non-negative number').notEmpty().withMessage('Read page is required'),
      body(`${index}.readPage`).custom((value, { req }) => {
        if (value > req.body[index].pageCount) {
          throw new Error('Read page cannot be greater than page count');
        }
        return true;
      })
    ]);

    Promise.all(validationChain.map(validation => validation.run(req)))
      .then(() => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status: 'fail',
            errors: errors.array()
          });
        }
        next();
      })
  }
];

module.exports = { validateBulkBooks };