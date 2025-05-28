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
//@access           Private
export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    } else {
      tasks = await Task.find({ ...filter, assignedTo: req.user._id }).populate(
        "assignedTo",
        "name email profileImageUrl"
      );
    }

    // ADD completed todoChecklist count to each task
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedCount = task.todoChecklist.filter(
          (item) => item.completed
        ).length;

        return { ...task._doc, completedTodoCount: completedCount };
      })
    );

    // Status summary count
    const allTasks = await Task.countDocuments(
      req.user.role === "admin" ? {} : { assignedTo: req.user._id }
    );

    // Pending task count
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "Pending",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // in Progress task count
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in Progress",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    // in Progress task count
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "Completed",
      ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        all: allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Get Task By ID
//@route            Get  /api/tasks/:id
//@access           Private
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
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
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Status
//@route            PUT  /api/tasks/:id
//@access           Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.deuDate = req.body.deuDate || task.deuDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "assignedTo must be an array of use ID's" });
      }
      task.assignedTo = req.body.assignedTo;
    }

    const updatedTask = await task.save();

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Status
//@route            PUT  /api/tasks/:id/status
//@access           Private
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (isAssigned && req.params.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoChecklist.forEach((item) => (item.completed = true));
      task.progress = 100;
    }

    await task.save();

    res.status(200).json({ message: "Task status updated Successfullt", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Update Task Checked List
//@route            PUT  /api/tasks/:id/todo
//@access           Private
export const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update chechklist" });
    }

    task.todoChecklist = todoChecklist; // Replace with updated checklist

    //Auto-update progress based on checklist completion
    const completedCount = task.todoChecklist.filter(
      (item) => item.completed
    ).length;

    const totalItems = task.todoChecklist.length;
    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    //Auto-mark task as completed if all items are checked
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }

    await task.save();
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profileImageUrl"
    );

    res
      .status(200)
      .json({ message: "Task chechlist updated", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
