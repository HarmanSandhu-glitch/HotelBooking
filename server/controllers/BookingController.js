import Booking from "../models/booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/hotel.js";
import transporter from "../config/nodeMailer.js";

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { room, hotel, checkInDate, checkOutDate, totalPrice, guests, paymentMethod } = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!room || !hotel || !checkInDate || !checkOutDate || !totalPrice || !guests) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (room, hotel, checkInDate, checkOutDate, totalPrice, guests)"
            });
        }

        // Validate dates
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkIn < today) {
            return res.status(400).json({
                success: false,
                message: "Check-in date cannot be in the past"
            });
        }

        if (checkOut <= checkIn) {
            return res.status(400).json({
                success: false,
                message: "Check-out date must be after check-in date"
            });
        }

        // Check if room exists and is available
        const roomExists = await Room.findById(room);
        if (!roomExists) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        if (!roomExists.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Room is not available"
            });
        }

        // Check for existing bookings that overlap
        const existingBooking = await Booking.findOne({
            room,
            status: { $ne: 'cancelled' },
            $or: [
                {
                    checkInDate: { $lte: checkOut },
                    checkOutDate: { $gte: checkIn }
                }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "Room is already booked for selected dates"
            });
        }

        // Create new booking
        const newBooking = new Booking({
            user: userId,
            room,
            hotel,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            totalPrice,
            guests,
            paymentMethod: paymentMethod || "Pay At Hotel",
            status: "pending",
            isPaid: false
        });

        await newBooking.save();

        // Populate booking details
        const populatedBooking = await Booking.findById(newBooking._id)
            .populate('room', 'roomType pricePerNight images')
            .populate('hotel', 'name address city contact')
            .populate('user', 'username email');

        const mailOptions = {
            from: process.env.SMTP_EMAIL || 'no-reply@hotelbooking.com',
            to: populatedBooking.user.email,
            subject: `Booking Confirmation — ${populatedBooking.hotel.name}`,
            html: `
            <p>Hi ${populatedBooking.user.username || 'Guest'},</p>
            <p>Thank you for your booking at <strong>${populatedBooking.hotel.name}</strong>.</p>
            <h4>Booking details</h4>
            <ul>
              <li><strong>Room:</strong> ${populatedBooking.room.roomType}</li>
              <li><strong>Check-in:</strong> ${new Date(populatedBooking.checkInDate).toLocaleDateString()}</li>
              <li><strong>Check-out:</strong> ${new Date(populatedBooking.checkOutDate).toLocaleDateString()}</li>
              <li><strong>Guests:</strong> ${populatedBooking.guests}</li>
              <li><strong>Total price:</strong> ${populatedBooking.totalPrice}</li>
              <li><strong>Payment method:</strong> ${populatedBooking.paymentMethod}</li>
              <li><strong>Booking status:</strong> ${populatedBooking.status}</li>
            </ul>
            <p>If you have any questions, contact the hotel at ${populatedBooking.hotel.contact || 'N/A'}.</p>
            <p>Regards,<br/>${populatedBooking.hotel.name}</p>
            `
        }
        await transporter.sendMail({

        })
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: populatedBooking
        });

    } catch (error) {
        console.error("❌ Create booking error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};

// Get all bookings (admin)
export const getAllBookings = async (req, res) => {
    try {
        const { status, isPaid } = req.query;

        const filter = {};
        if (status) filter.status = status;
        if (isPaid !== undefined) filter.isPaid = isPaid === 'true';

        const bookings = await Booking.find(filter)
            .populate('user', 'username email image')
            .populate('room', 'roomType pricePerNight images')
            .populate('hotel', 'name address city')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error("❌ Get all bookings error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            error: error.message
        });
    }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status } = req.query;

        const filter = { user: userId };
        if (status) filter.status = status;

        const bookings = await Booking.find(filter)
            .populate('room', 'roomType pricePerNight images amenities')
            .populate('hotel', 'name address city contact')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error("❌ Get user bookings error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            error: error.message
        });
    }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const booking = await Booking.findById(id)
            .populate('user', 'username email image')
            .populate('room', 'roomType pricePerNight images amenities maxGuests')
            .populate({
                path: 'hotel',
                select: 'name address city contact',
                populate: {
                    path: 'owner',
                    select: 'username email'
                }
            });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user owns this booking or is hotel owner
        const isOwner = booking.user._id.toString() === userId.toString();
        const isHotelOwner = booking.hotel.owner._id.toString() === userId.toString();

        if (!isOwner && !isHotelOwner) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this booking"
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });

    } catch (error) {
        console.error("❌ Get booking error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get booking",
            error: error.message
        });
    }
};

// Get bookings for hotel owner
export const getHotelOwnerBookings = async (req, res) => {
    try {
        const ownerId = req.user._id;
        const { status } = req.query;

        // Get all hotels owned by user
        const hotels = await Hotel.find({ owner: ownerId }).select('_id');
        const hotelIds = hotels.map(hotel => hotel._id);

        const filter = { hotel: { $in: hotelIds } };
        if (status) filter.status = status;

        const bookings = await Booking.find(filter)
            .populate('user', 'username email image')
            .populate('room', 'roomType pricePerNight')
            .populate('hotel', 'name address city')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error("❌ Get hotel owner bookings error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get bookings",
            error: error.message
        });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user._id;

        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Must be 'pending', 'confirmed', or 'cancelled'"
            });
        }

        const booking = await Booking.findById(id).populate('hotel');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check authorization (user can cancel, hotel owner can confirm/cancel)
        const isUser = booking.user.toString() === userId.toString();
        const isHotelOwner = booking.hotel.owner.toString() === userId.toString();

        if (status === 'cancelled' && !isUser && !isHotelOwner) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to cancel this booking"
            });
        }

        if (status === 'confirmed' && !isHotelOwner) {
            return res.status(403).json({
                success: false,
                message: "Only hotel owner can confirm bookings"
            });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            success: true,
            message: `Booking ${status} successfully`,
            data: booking
        });

    } catch (error) {
        console.error("❌ Update booking status error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update booking status",
            error: error.message
        });
    }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPaid, paymentMethod } = req.body;
        const userId = req.user._id;

        const booking = await Booking.findById(id).populate('hotel');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this booking"
            });
        }

        if (isPaid !== undefined) booking.isPaid = isPaid;
        if (paymentMethod) booking.paymentMethod = paymentMethod;

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            data: booking
        });

    } catch (error) {
        console.error("❌ Update payment status error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update payment status",
            error: error.message
        });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to cancel this booking"
            });
        }

        // Check if booking can be cancelled
        if (booking.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: "Booking is already cancelled"
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });

    } catch (error) {
        console.error("❌ Cancel booking error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to cancel booking",
            error: error.message
        });
    }
};

// Delete booking (admin only)
export const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete booking error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete booking",
            error: error.message
        });
    }
};
