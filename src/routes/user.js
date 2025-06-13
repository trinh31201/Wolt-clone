import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getAllUsers);

export default router;
