import Task from "../models/Task.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//@description      Get all users (admin onliy)
//@route            Get  /api/users/
//@access           Private (admin olny)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password"); // only member role user show
    //  Add task count to each user
    const usersWithTaskCounts = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc, //Include all exsting user data
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );

    res.json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get user by ID
//@route            Get  /api/users/:id
//@access           Private (admin olny)
export const getUserById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Deleate a user (admin onliy)
//@route            DELETE  /api/users/:id
//@access           Private (admin olny)
export const deleteUsers = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
