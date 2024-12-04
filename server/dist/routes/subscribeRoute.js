import { Router } from "express";
import { createSubscribers } from "../controllers/subscribeController.js";
const router = Router();
router.post("/create", createSubscribers);
export default router;
