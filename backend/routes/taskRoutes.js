import express from "express";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  getDashboardData,
  getUserDashboardData,
  getTask,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  updateTaskChecklist,
} from "../controllers/taskController.js";

const router = express.Router();

// TASK Management routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTask); //get all Task (Admin : all, user: assigned)
router.get("/:id", protect, getTaskById); // Get Task by ID (Admin only)

router.post("/", protect, adminOnly, createTask); // Create a Task (Admin only)

router.delete("/:id", protect, adminOnly, deleteTask); // Delete a Task (Admin only)

router.put("/:id", protect, updateTask); //Update Task Details
router.put("/:id/status", protect, updateTaskStatus); // Update task Status
router.put("/:id/todo", protect, updateTaskChecklist); // Update task Check List
export default router;
