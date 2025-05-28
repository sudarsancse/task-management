import Task from "../models/Task.js";
import User from "../models/User.js";
import excelJS from "exceljs";

//@description      Export all tasks as an Excel file
//@route            Get  /api/reports/export/tasks
//@access           Private (Admin only)
export const exportTaskReport = async (req, res) => {
  try {
    const task = await Task.find().populate("assignedTo", "name email");

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Task Report");

    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned", key: "assignedTo", width: 30 },
    ];

    task.forEach((task) => {
      const assignedTo = task.assignedTo
        .map((user) => `${user.name} (${user.email})`)
        .join(", ");

      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.toISOString().split("T")[0],
        assigned: assignedTo || "Unassigned",
      });
    });

    res.setHeader(
      "Content_Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content_Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//@description      Export  usrs-task report as an Excel file
//@route            Get  /api/reports/export/users
//@access           Private (Admin only)
export const exportUsersReport = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
