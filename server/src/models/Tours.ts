import { model, Schema, Document } from "mongoose";

export interface ToursConstructor extends Document {
  title: string;
  photo: string;
  desc: string;
  price: number;
  rating: number;
  featured: boolean;
  topPlaces: string[];
}

const tourSchema: Schema = new Schema<ToursConstructor>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    topPlaces: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export default model<ToursConstructor>("Tour", tourSchema);
