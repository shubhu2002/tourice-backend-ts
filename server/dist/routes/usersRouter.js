import { Router } from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById, } from "../controllers/userConrtoller.js";
const router = Router();
router.post("/create", createUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.get("/search/:id", getUserById);
router.get("/all", getAllUsers);
export default router;
