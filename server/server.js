import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./middleware/clerkWebhook.js";
import userRouter from "./routes/userRoutes.js"
import hotelRouter from "./routes/hotelRoutes.js"
import connectCloudinary from "./config/cloudinary.js";

connectDB();
connectCloudinary();
const app = express();

app.use(cors());
app.use(clerkMiddleware())


app.use("/api/clerk", clerkWebhooks);

app.use("/api/user", userRouter);
app.use("/api/hotel", hotelRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running ... ");
})