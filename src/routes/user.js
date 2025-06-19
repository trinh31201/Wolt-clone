import express from 'express';
import userController from '../controllers/user.js';
import {authenticate, allowRoles} from '../middlewares/auth.js'

const router = express.Router();

router.get('/me',authenticate, userController.getMe);
router.delete('/me',authenticate, userController.deleteMe);
router.put('/me',authenticate, userController.updateMe);

router.post('/', authenticate, allowRoles(['admin']), userController.addUser);
router.get('/', authenticate, allowRoles(['admin']), userController.getAllUsers);
router.get('/:id',authenticate, allowRoles(['admin']), userController.getUserById);
router.delete('/:id',authenticate, allowRoles(['admin']), userController.deleteUserById);
router.put('/:id',authenticate, allowRoles(['admin']), userController.updateUserById);

export default router;
