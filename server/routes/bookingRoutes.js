import express from 'express';
import { protect, isHotelOwner } from '../middleware/authMiddleware.js';
import {
    createBooking,
    getAllBookings,
    getUserBookings,
    getBookingById,
    getHotelOwnerBookings,
    updateBookingStatus,
    updatePaymentStatus,
    cancelBooking,
    deleteBooking
} from '../controllers/BookingController.js';

const router = express.Router();

// User booking routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.patch('/:id/cancel', protect, cancelBooking);
router.patch('/:id/payment', protect, updatePaymentStatus);

// Hotel owner routes
router.get('/owner/bookings', protect, isHotelOwner, getHotelOwnerBookings);
router.patch('/:id/status', protect, updateBookingStatus);

// Admin routes
router.get('/', protect, getAllBookings);
router.delete('/:id', protect, deleteBooking);

export default router;
