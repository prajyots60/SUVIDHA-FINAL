import express from 'express';
import { signup, login, logout, refreshToken, getCurrentUser, updateUserRole, updateUser, updatePassword } from '../controllers/auth.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh_token', refreshToken);
router.get('/current', authenticateUser, getCurrentUser);
router.patch('/:userId/role', updateUserRole)
// Add this line for updating user details
router.patch('/update', authenticateUser, updateUser);
// Add this line for updating user password
router.patch('/update-password', authenticateUser, updatePassword);




export default router;