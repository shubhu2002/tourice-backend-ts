import { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";
const router = Router();
router.post("/new", createBooking);
export default router;
