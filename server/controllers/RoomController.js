import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary"
import Hotel from "../models/hotel.js";

// Add a new room
export const addRoom = async (req, res) => {
    try {
        const { hotel, roomType, pricePerNight, amenities, maxGuests, bedrooms, bathrooms, description } = req.body;
        const ownerId = req.user._id;

        // Validate required fields
        if (!hotel || !roomType || !pricePerNight || !amenities) {
            return res.status(400).json({
                success: false,
                message: "Hotel, room type, price, and amenities are required"
            });
        }

        // Check if hotel exists
        const hotelExists = await Hotel.findById(hotel);
        if (!hotelExists) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check if user owns the hotel
        if (hotelExists.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to add rooms to this hotel"
            });
        }
        const uploadImages = req.files.map(async (file) => {
            const response = await cloudinary.uploader.upload(file.path); // returns a secure url
            return response.secure_url;
        })

        const images = await Promise.all(uploadImages);

        // Create new room
        const newRoom = new Room({
            hotel,
            roomType,
            pricePerNight,
            amenities,
            images: images || [],
            maxGuests,
            bedrooms,
            bathrooms,
            description,
            isAvailable: true
        });

        await newRoom.save();

        res.status(201).json({
            success: true,
            message: "Room added successfully",
            data: newRoom
        });

    } catch (error) {
        console.error("❌ Add room error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add room",
            error: error.message
        });
    }
};

// Get all rooms
export const getAllRooms = async (req, res) => {
    try {
        const { city, roomType, minPrice, maxPrice, amenities, isAvailable, search } = req.query;

        // Build filter object
        const filter = {};

        if (roomType) filter.roomType = { $regex: roomType, $options: 'i' };
        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
            if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
        }
        if (amenities) {
            const amenitiesArray = amenities.split(',');
            filter.amenities = { $all: amenitiesArray };
        }
        if (isAvailable !== undefined) {
            filter.isAvailable = isAvailable === 'true';
        }
        if (search) {
            filter.roomType = { $regex: search, $options: 'i' };
        }

        let rooms = await Room.find(filter)
            .populate({
                path: 'hotel',
                select: 'name address city contact owner'
            })
            .sort({ createdAt: -1 });

        // Filter by city if provided (after population)
        if (city) {
            rooms = rooms.filter(room => room.hotel && room.hotel.city === city);
        }

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });

    } catch (error) {
        console.error("❌ Get all rooms error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get rooms",
            error: error.message
        });
    }
};

// Get room by ID
export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;

        const room = await Room.findById(id)
            .populate({
                path: 'hotel',
                select: 'name address city contact owner',
                populate: {
                    path: 'owner',
                    select: 'username email image'
                }
            });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        res.status(200).json({
            success: true,
            data: room
        });

    } catch (error) {
        console.error("❌ Get room error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get room",
            error: error.message
        });
    }
};

// Get rooms by hotel
export const getRoomsByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        const rooms = await Room.find({ hotel: hotelId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });

    } catch (error) {
        console.error("❌ Get hotel rooms error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get rooms",
            error: error.message
        });
    }
};

// Get rooms by owner
export const getRoomsByOwner = async (req, res) => {
    try {
        const ownerId = req.user._id;

        // Get all hotels owned by user
        const hotels = await Hotel.find({ owner: ownerId }).select('_id');
        const hotelIds = hotels.map(hotel => hotel._id);

        // Get all rooms for these hotels
        const rooms = await Room.find({ hotel: { $in: hotelIds } })
            .populate('hotel', 'name address city')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms
        });

    } catch (error) {
        console.error("❌ Get owner rooms error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get rooms",
            error: error.message
        });
    }
};

// Update room
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { roomType, pricePerNight, amenities, images, isAvailable, maxGuests, bedrooms, bathrooms, description } = req.body;
        const ownerId = req.user._id;

        // Find room with hotel info
        const room = await Room.findById(id).populate('hotel');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Check if user owns the hotel
        if (room.hotel.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this room"
            });
        }

        // Update fields
        if (roomType) room.roomType = roomType;
        if (pricePerNight) room.pricePerNight = pricePerNight;
        if (amenities) room.amenities = amenities;
        if (images) room.images = images;
        if (isAvailable !== undefined) room.isAvailable = isAvailable;
        if (maxGuests) room.maxGuests = maxGuests;
        if (bedrooms) room.bedrooms = bedrooms;
        if (bathrooms) room.bathrooms = bathrooms;
        if (description) room.description = description;

        await room.save();

        res.status(200).json({
            success: true,
            message: "Room updated successfully",
            data: room
        });

    } catch (error) {
        console.error("❌ Update room error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update room",
            error: error.message
        });
    }
};

// Delete room
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.user._id;

        // Find room with hotel info
        const room = await Room.findById(id).populate('hotel');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Check if user owns the hotel
        if (room.hotel.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this room"
            });
        }

        await Room.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Room deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete room error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete room",
            error: error.message
        });
    }
};

// Toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.user._id;

        // Find room with hotel info
        const room = await Room.findById(id).populate('hotel');

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        // Check if user owns the hotel
        if (room.hotel.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to modify this room"
            });
        }

        // Toggle availability
        room.isAvailable = !room.isAvailable;
        await room.save();

        res.status(200).json({
            success: true,
            message: `Room is now ${room.isAvailable ? 'available' : 'unavailable'}`,
            data: room
        });

    } catch (error) {
        console.error("❌ Toggle availability error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to toggle availability",
            error: error.message
        });
    }
};

// Get available room types
export const getRoomTypes = async (req, res) => {
    try {
        const roomTypes = await Room.distinct('roomType');

        res.status(200).json({
            success: true,
            count: roomTypes.length,
            data: roomTypes
        });

    } catch (error) {
        console.error("❌ Get room types error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get room types",
            error: error.message
        });
    }
};
