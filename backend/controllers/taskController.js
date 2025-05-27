import Task from "../models/Task.js";

//@description      Get DashBorad data (Admin only)
//@route            Get  /api/tasks/dashboard-data
//@access           Private
export const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get Dashboard data (User -specific)
//@route            Get  /api/tasks/user-dashboard-data
//@access           Private
export const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get all Tasks (Admin : all, user : only assigned tasks)
//@route            Get  /api/tasks/
//@access           Private (admin olny)
export const getTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get Task By ID
//@route            Get  /api/tasks/:id
//@access           Private
export const getTaskById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Create a new Task (Admin only)
//@route            POST  /api/tasks/
//@access           Private (admin olny)
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      deuDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(500)
        .json({ message: "assignedTo must be an array of uer ID's" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      deuDate,
      assignedTo,
      createdBy: req.user._id,
      attachments,
      todoChecklist,
    });

    res.status(200).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Delete a Task (admin onliy)
//@route            DELETE  /api/tasks/:id
//@access           Private (admin olny)
export const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Status
//@route            PUT  /api/tasks/:id
//@access           Private
export const updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Status
//@route            PUT  /api/tasks/:id/status
//@access           Private
export const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Checked List
//@route            PUT  /api/tasks/:id/todo
//@access           Private
export const updateTaskChecklist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
