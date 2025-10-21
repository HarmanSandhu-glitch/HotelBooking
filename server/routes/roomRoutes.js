import express from 'express';
import { protect, isHotelOwner } from '../middleware/authMiddleware.js';
import {
    addRoom,
    getAllRooms,
    getRoomById,
    getRoomsByHotel,
    getRoomsByOwner,
    updateRoom,
    deleteRoom,
    toggleRoomAvailability,
    getRoomTypes
} from "../controllers/RoomController.js";
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllRooms);
router.get('/types', getRoomTypes);
router.get('/hotel/:hotelId', getRoomsByHotel);
router.get('/:id', getRoomById);

// Protected hotel owner routes
router.post('/', upload.array("images", 4), protect, isHotelOwner, addRoom);
router.get('/owner/my-rooms', protect, isHotelOwner, getRoomsByOwner);
router.put('/:id', protect, isHotelOwner, updateRoom);
router.delete('/:id', protect, isHotelOwner, deleteRoom);
router.patch('/:id/toggle-availability', protect, isHotelOwner, toggleRoomAvailability);

export default router;
