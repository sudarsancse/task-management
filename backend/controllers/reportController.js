import Task from "../models/Task.js";
import User from "../models/User.js";
import excelJS from "exceljs";

//@description      Export all tasks as an excel file
//@route            Get  /api/tasks/user-dashboard-data
//@access           Private
export const exportTaskReport = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get Dashboard data (User -specific)
//@route            Get  /api/reports/export/users
//@access           Private
export const exportUsersReport = (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
