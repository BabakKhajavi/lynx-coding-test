import { param, query } from 'express-validator';

export const getProductsValidator = [
  query('currency')
    .optional()
    .isIn(['USD', 'CAD'])
    .withMessage('Currency must be either USD or CAD'),
];
export const getProductValidator = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  query('currency')
    .optional()
    .isIn(['USD', 'CAD'])
    .withMessage('Currency must be either USD or CAD'),
];
