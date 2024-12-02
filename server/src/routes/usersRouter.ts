import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userConrtoller.js";

const router = Router();

router.post("/new", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.get("/:id", getUserById);
router.get("/all", getAllUsers);

export default router;
