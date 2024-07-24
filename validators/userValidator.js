import { body } from 'express-validator';

export const userIdValidator = [
  body('userId').isInt().withMessage('User ID must be an integer'),
];