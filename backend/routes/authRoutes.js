import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/profile", protect, getUserProfile);
routes.put("/profile", protect, updateUserProfile);

export default routes;
