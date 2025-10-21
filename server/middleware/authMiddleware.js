import User from "../models/user.js"

export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No user ID found"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("❌ Auth error:", error.message);
        res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error.message
        });
    }
};

export const isHotelOwner = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - User not authenticated"
            });
        }
        if (req.user.role !== "hotelOwner") {
            return res.status(403).json({
                success: false,
                message: "Forbidden - Hotel owner access required"
            });
        }

        next();

    } catch (error) {
        console.error("❌ Authorization error:", error.message);
        res.status(500).json({
            success: false,
            message: "Authorization error",
            error: error.message
        });
    }
};