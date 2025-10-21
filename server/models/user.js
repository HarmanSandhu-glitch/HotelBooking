import mongoose from "mongoose";

const useSchema = mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "hotelOnwer"], default: "user" },
    recentSearchedCities: [{ type: String, required: true }]
}, { timestamps: true });

const User = mongoose.model("User", useSchema);

export default User;