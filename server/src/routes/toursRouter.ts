import { Router } from "express";
import {
  getAllTours,
  getFeaturedTours,
  getTourByTitle,
  getSingleTourById,
  deleteTourById,
  updateTourById,
  createTour,
} from "../controllers/tourController.js";

const router = Router();

router.post("/new", createTour);
router.put("/:id", updateTourById);
router.delete("/:id", deleteTourById);
router.get("/:id", getSingleTourById);
router.get("/:title", getTourByTitle);
router.get("/all", getAllTours);
router.get("/featured", getFeaturedTours);

export default router;
