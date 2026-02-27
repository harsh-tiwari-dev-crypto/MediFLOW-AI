import express from "express";
import { registerUser, loginUser, refreshToken, logoutUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/logout", protect, logoutUser);

export default router;