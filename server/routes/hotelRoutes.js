import express from 'express';
import { protect, isHotelOwner } from '../middleware/authMiddleware.js';
import {
    registerHotel,
    getAllHotels,
    getHotelById,
    getHotelsByOwner,
    updateHotel,
    deleteHotel,
    getHotelsByCity,
    getAvailableCities
} from "../controllers/HotelController.js";

const router = express.Router();

// Public routes
router.get('/', getAllHotels);
router.get('/cities', getAvailableCities);
router.get('/city/:city', getHotelsByCity);
router.get('/:id', getHotelById);

// Protected hotel owner routes
router.post('/', protect, isHotelOwner, registerHotel);
router.get('/owner/my-hotels', protect, isHotelOwner, getHotelsByOwner);
router.put('/:id', protect, isHotelOwner, updateHotel);
router.delete('/:id', protect, isHotelOwner, deleteHotel);

export default router;