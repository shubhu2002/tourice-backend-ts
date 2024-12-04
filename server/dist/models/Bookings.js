import { Schema, model } from "mongoose";
const bookingSchema = new Schema({
    userId: {
        type: String,
    },
    userEmail: {
        type: String,
    },
    tourName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        requried: true,
    },
}, { timestamps: true });
export default model("Booking", bookingSchema);
