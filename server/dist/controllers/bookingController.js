import Booking from "../models/Bookings.js";
import { BookingZodSchema } from "../types/index.js";
export const createBooking = async (req, res) => {
    try {
        const booking = BookingZodSchema.parse(req.body);
        const newBooking = new Booking(booking);
        const savedBooking = await newBooking.save();
        res.status(200).json({
            status: true,
            data: savedBooking,
        });
    }
    catch (error) {
        res.status(500).json({ status: false, error: error });
    }
};
