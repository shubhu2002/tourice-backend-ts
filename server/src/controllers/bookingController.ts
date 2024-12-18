import type { Request, Response } from "express";

import Booking from "../models/Bookings.js";
import { BookingConstrutor, BookingZodSchema } from "../types/index.js";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = BookingZodSchema.parse(req.body);
    const newBooking = new Booking(booking);
    const savedBooking = await newBooking.save();
    res.status(200).json({
      status: true,
      data: savedBooking as BookingConstrutor,
    });
  } catch (error: any) {
    res.status(500).json({ status: false, error: error });
  }
};

export const getAllBookingById = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      res.status(404).json("No Id Found");
      return;
    }
    const bookings = await Booking.find({ userId });
    if (!bookings) {
      res.status(404).json({ status: true, message: "No data found" });
      return;
    }
    res.status(200).json({
      status: true,
      data: bookings as BookingConstrutor[],
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
