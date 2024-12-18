import { Router } from "express";
import { createBooking, getAllBookingById, } from "../controllers/bookingController.js";
const router = Router();
router.post("/create", createBooking);
router.get("/search/:id", getAllBookingById);
export default router;
