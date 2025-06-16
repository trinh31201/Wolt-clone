import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.put('/:id', userController.updateUserById);

export default router;
