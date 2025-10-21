import User from "../models/user.js";

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = req.user; // Already fetched by protect middleware

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("❌ Get profile error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get user profile",
            error: error.message
        });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const { username, image } = req.body;
        const userId = req.user._id;

        // Prepare update data
        const updateData = {};
        if (username) updateData.username = username;
        if (image) updateData.image = image;

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUser
        });

    } catch (error) {
        console.error("❌ Update profile error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message
        });
    }
};

// Add city to recent searches
export const addRecentCity = async (req, res) => {
    try {
        const { city } = req.body;
        const userId = req.user._id;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required"
            });
        }

        // Get user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Remove city if already exists
        user.recentSearchedCities = user.recentSearchedCities.filter(
            c => c !== city
        );

        // Add city to beginning of array
        user.recentSearchedCities.unshift(city);

        // Keep only last 5 cities
        if (user.recentSearchedCities.length > 5) {
            user.recentSearchedCities = user.recentSearchedCities.slice(0, 5);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Recent city added",
            data: user.recentSearchedCities
        });

    } catch (error) {
        console.error("❌ Add recent city error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to add recent city",
            error: error.message
        });
    }
};

// Get recent searched cities
export const getRecentCities = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select('recentSearchedCities');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user.recentSearchedCities
        });

    } catch (error) {
        console.error("❌ Get recent cities error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get recent cities",
            error: error.message
        });
    }
};

// Update user role (admin only - for upgrading to hotel owner)
export const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        if (!userId || !role) {
            return res.status(400).json({
                success: false,
                message: "User ID and role are required"
            });
        }

        // Validate role
        if (!['user', 'hotelOwner'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be 'user' or 'hotelOwner'"
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: user
        });

    } catch (error) {
        console.error("❌ Update role error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: error.message
        });
    }
};

// Delete user account
export const deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User account deleted successfully"
        });

    } catch (error) {
        console.error("❌ Delete account error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to delete account",
            error: error.message
        });
    }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-__v');

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        console.error("❌ Get all users error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to get users",
            error: error.message
        });
    }
};
