import express from 'express';
import { increaseBalance, decreaseBalance, getUserBalance } from '../controllers/userController.js';
import { userIdValidator } from '../validators/userValidator.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server is running');
  });

router.post('/up', userIdValidator, validate, increaseBalance);
router.post('/down', userIdValidator, validate, decreaseBalance);
router.get('/:userId', getUserBalance);

export default router;