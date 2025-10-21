import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getUserProfile,
    updateUserProfile,
    addRecentCity,
    getRecentCities,
    updateUserRole,
    deleteUserAccount,
    getAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// User profile routes
router.get('/', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Recent cities routes
router.post('/store-recent-search', protect, addRecentCity);
router.get('/get-recent-searches', protect, getRecentCities);

// Account management
router.delete('/account', protect, deleteUserAccount);

// Admin routes (add admin middleware if needed)
router.put('/role', protect, updateUserRole);
router.get('/all', protect, getAllUsers);

export default router;
