import { Router } from "express";
import { registerUser } from "./../controllers/authController.js";

const router = Router();

// update User
router.post("/register", registerUser);

// delete User
// router.post("/login",login);

export default router;
