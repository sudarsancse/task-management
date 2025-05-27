import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getUsers,
  getUserById,
  deleteUsers,
} from "../controllers/userController.js";

const router = express.Router();

// USer management Routes
router.get("/", protect, adminOnly, getUsers); // get all users (admin only)
router.get("/:id", protect, getUserById); //Get all specific users
router.delete("/:id", protect, adminOnly, deleteUsers); // Delete users (admin only)

export default router;
