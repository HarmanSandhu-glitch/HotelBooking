import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./middleware/clerkWebhook.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express app
const app = express();

// Connect to Database and Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Clerk webhook - must be before clerkMiddleware
app.use("/api/webhooks/clerk", clerkWebhooks);

// Clerk authentication middleware
app.use(clerkMiddleware());

// API Routes
app.use("/api/users", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});