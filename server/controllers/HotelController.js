import Hotel from "../models/hotel.js";
import User from "../models/user.js";

// Register/Create a new hotel
export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const ownerId = req.user._id;

        // Validate required fields
        if (!name || !address || !contact || !city) {
            return res.status(400).json({
                success: false,
                message: "All fields are required (name, address, contact, city)"
            });
        }

        // Check if user is hotel owner
        if (req.user.role !== "hotelOwner") {
            return res.status(403).json({
                success: false,
                message: "Only hotel owners can register hotels"
            });
        }

        // Create new hotel
        const newHotel = new Hotel({
            name,
            address,
            contact,
            city,
            owner: ownerId
        });

        await newHotel.save();

        res.status(201).json({
            success: true,
            message: "Hotel registered successfully",
            data: newHotel
        });

    } catch (error) {
        console.error("❌ Register hotel error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to register hotel",
            error: error.message
        });
    }
};

// Get all hotels
export const getAllHotels = async (req, res) => {
    try {
        const { city, search } = req.query;

        // Build filter object
        const filter = {};
        if (city) filter.city = city;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { address: { $regex: search, $options: 'i' } }
            ];
        }

        const hotels = await Hotel.find(filter)
            .populate('owner', 'username email image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });

    } catch (error) {
        console.error("❌ Get all hotels error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get hotels",
            error: error.message
        });
    }
};

// Get hotel by ID
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;

        const hotel = await Hotel.findById(id)
            .populate('owner', 'username email image contact');

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        res.status(200).json({
            success: true,
            data: hotel
        });

    } catch (error) {
        console.error("❌ Get hotel error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get hotel",
            error: error.message
        });
    }
};

// Get hotels by owner
export const getHotelsByOwner = async (req, res) => {
    try {
        const ownerId = req.user._id;

        const hotels = await Hotel.find({ owner: ownerId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });

    } catch (error) {
        console.error("❌ Get owner hotels error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get hotels",
            error: error.message
        });
    }
};

// Update hotel
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, contact, city } = req.body;
        const ownerId = req.user._id;

        // Find hotel
        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check if user is the owner
        if (hotel.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this hotel"
            });
        }

        // Update fields
        if (name) hotel.name = name;
        if (address) hotel.address = address;
        if (contact) hotel.contact = contact;
        if (city) hotel.city = city;

        await hotel.save();

        res.status(200).json({
            success: true,
            message: "Hotel updated successfully",
            data: hotel
        });

    } catch (error) {
        console.error("❌ Update hotel error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update hotel",
            error: error.message
        });
    }
};

// Delete hotel
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const ownerId = req.user._id;

        // Find hotel
        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found"
            });
        }

        // Check if user is the owner
        if (hotel.owner.toString() !== ownerId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this hotel"
            });
        }

        await Hotel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Hotel deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete hotel error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete hotel",
            error: error.message
        });
    }
};

// Get hotels by city
export const getHotelsByCity = async (req, res) => {
    try {
        const { city } = req.params;

        const hotels = await Hotel.find({ city })
            .populate('owner', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });

    } catch (error) {
        console.error("❌ Get hotels by city error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get hotels",
            error: error.message
        });
    }
};

// Get available cities (unique cities with hotels)
export const getAvailableCities = async (req, res) => {
    try {
        const cities = await Hotel.distinct('city');

        res.status(200).json({
            success: true,
            count: cities.length,
            data: cities
        });

    } catch (error) {
        console.error("❌ Get cities error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get cities",
            error: error.message
        });
    }
};

