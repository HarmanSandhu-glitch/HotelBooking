import User from "../models/user.js";
import { Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
    try {
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };
        await webhook.verify(JSON.stringify(req.body), headers);
        const { data, type } = req.body;
        switch (type) {
            case "user.created": {
                const newUser = new User({
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || "",
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
                    image: data.image_url || "",
                    role: "user",
                    recentSearchedCities: []
                });

                await newUser.save();
                console.log("✅ User created:", newUser._id);
                break;
            }

            case "user.updated": {
                const updatedData = {
                    email: data.email_addresses[0]?.email_address || "",
                    username: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
                    image: data.image_url || ""
                };

                await User.findByIdAndUpdate(data.id, updatedData, { new: true });
                console.log("✅ User updated:", data.id);
                break;
            }

            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                console.log("✅ User deleted:", data.id);
                break;
            }

            default:
                console.log("⚠️ Unhandled webhook event:", type);
        }
        res.status(200).json({
            success: true,
            message: "Webhook processed successfully"
        });

    } catch (error) {
        console.error("❌ Webhook error:", error.message);
        res.status(400).json({
            success: false,
            message: "Webhook verification failed",
            error: error.message
        });
    }
};

export default clerkWebhooks;