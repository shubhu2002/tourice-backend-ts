import { Schema, model, Document } from "mongoose";

export interface BookingConstrutor extends Document {
  userId: string;
  userEmail: string;
  tourName: string;
  fullName: string;
  guests: number;
  phone: number;
  date: string;
  totalAmount: number;
}

const bookingSchema = new Schema<BookingConstrutor>(
  {
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
  },
  { timestamps: true }
);

export default model<BookingConstrutor>("Booking", bookingSchema);
