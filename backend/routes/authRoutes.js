import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import uplode from "../middlewares/uplodeMiddleware.js";

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/profile", protect, getUserProfile);
routes.put("/profile", protect, updateUserProfile);

//
routes.post("/upload-image", uplode.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageUrl });
});

export default routes;
