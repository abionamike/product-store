import express from 'express';
import {
  getUsers, registerUser,
  userLogin, updateUser, getUserById, deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.post('/', registerUser);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.post('/login', userLogin);

export default router;
