import { z } from "zod";
export const UserZodSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
});
export const ToursZodSchema = z.object({
    title: z.string(),
    photo: z.string(),
    desc: z.string(),
    price: z.number(),
    rating: z.number(),
    featured: z.boolean(),
    topPlaces: z.string().array(),
});
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
