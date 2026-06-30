import type { Request, Response } from "express";

import Booking from "../models/Bookings.js";
import { BookingConstrutor, BookingZodSchema } from "../types/index.js";
import { NotFoundError } from "../errors/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createBooking = asyncHandler(
  async (req: Request, res: Response) => {
    const booking = BookingZodSchema.parse(req.body);
    const newBooking = new Booking(booking);
    const savedBooking = await newBooking.save();

    res.status(200).json({
      status: true,
      data: savedBooking as BookingConstrutor,
    });
  },
);

export const getAllBookingById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    if (!userId) throw new NotFoundError("No Id Found");

    const bookings = await Booking.find({ userId });
    if (!bookings || bookings.length === 0)
      throw new NotFoundError("No data found");

    res.status(200).json({
      status: true,
      data: bookings as BookingConstrutor[],
    });
  },
);
