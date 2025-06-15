import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import { API_PATH } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectUsers from "../../components/inputs/SelectUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";

function CreateTask() {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    deuDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handelValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    //reset From
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      deuDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  //Create Task
  const createTask = async () => {
    setLoading(true);

    try {
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));

      const res = await axiosInstance.post(API_PATH.TASKS.CREATE_TASK, {
        ...taskData,
        deuDate: new Date(taskData.deuDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task Created Successfully");
      clearData();
    } catch (error) {
      console.error("Error creating Task", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //Update Task
  const updateTask = async () => {};
  //Submit Task
  const handleSubmit = async () => {
    setError(null);

    //Input Validition
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!taskData.deuDate) {
      setError("DueDate is required");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task not Assigned to any member.");
      return;
    }

    if (!taskData.todoChecklist?.length === 0) {
      setError("Add atleast one Task.");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  //Get Task info by ID
  const getTaskDetailsByID = async () => {};

  // Delete Task

  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className=" mt-5">
        <div className=" grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className=" form-card col-span-2">
            <div className=" flex items-center justify-between">
              <h2 className="  text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className=" flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className=" text-base" />
                  Delete
                </button>
              )}
            </div>

            <div className=" mt-4">
              <label className=" text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder=" Create App UI"
                className=" form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handelValueChange("title", target.value)
                }
              />
            </div>

            <div className=" mt-3">
              <label className=" text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe Task"
                className=" form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handelValueChange("description", target.value)
                }
              />
            </div>

            <div className=" grid grid-cols-12 gap-4 mt-2">
              <div className=" col-span-6 md:col-span-4">
                <label className=" text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handelValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className=" col-span-6 md:col-span-4">
                <label className=" text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className=" form-input"
                  value={taskData.deuDate || ""}
                  onChange={({ target }) =>
                    handelValueChange("deuDate", target.value)
                  }
                />
              </div>

              <div className=" col-span-12 md:col-span-3">
                <label className=" text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handelValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>

            <div className=" mt-3">
              <label className=" text-xs font-medium text-slate-600">
                TODO Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => {
                  handelValueChange("todoChecklist", value);
                }}
              />
            </div>

            <div className=" mt-3">
              <label className=" text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => {
                  handelValueChange("attachments", value);
                }}
              />
            </div>

            {error && (
              <p className=" text-xs font-medium text-red-500 mt-5">{error}</p>
            )}

            <div className=" flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateTask;
