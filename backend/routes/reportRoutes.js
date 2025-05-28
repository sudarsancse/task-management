import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  exportTaskReport,
  exportUsersReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTaskReport); //Export all Task as a Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); //Export user-task report

export default router;
