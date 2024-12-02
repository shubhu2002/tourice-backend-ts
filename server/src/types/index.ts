import { z } from "zod";

export interface UserConstructor {
  username: string;
  email: string;
  password: string;
}

export const UserZodSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export interface ToursConstructor {
  title: string;
  photo: string;
  desc: string;
  price: number;
  rating: number;
  featured: boolean;
  topPlaces: string[];
}

export const ToursZodSchema = z.object({
  title: z.string(),
  photo: z.string(),
  desc: z.string(),
  price: z.number(),
  rating: z.number(),
  featured: z.boolean(),
  topPlaces: z.string().array(),
});

export interface BookingConstrutor {
  userId: string;
  userEmail: string;
  tourName: string;
  fullName: string;
  guests: number;
  phone: number;
  date: Date;
  totalAmount: number;
}

export const BookingZodSchema = z.object({
  userId: z.string(),
  userEmail: z.string(),
  tourName: z.string(),
  fullName: z.string(),
  guests: z.number(),
  phone: z.number(),
  date: z.date(),
  totalAmount: z.number(),
});
