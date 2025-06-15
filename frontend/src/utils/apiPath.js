export const BASE_URL = "http://localhost:5000";

//utils/apiPath.js
export const API_PATH = {
  AUTH: {
    REGISTER: "/api/auth/register", //Register a new user (Admin or Member)
    LOGIN: "/api/auth/login", //Authenticate user & return JWT Token
    GET_PROFILE: "/api/auth/profile", //Get login user details
  },

  USERS: {
    GET_ALL_USERS: "/api/users", // Get all users (Admin only)
    GET_USER_BY_ID: (taskId) => `/api/users/${taskId}`, //Get user by Id
    CREATE_USER: "/api/users", //Create a new user (Admin only)
    UPDATE_USER: (taskId) => `/api/users/${taskId}`, //Update users details
    DELETE_USER: (taskId) => `/api/users/${taskId}`, // Delete user
  },

  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", // Get Dashboard Data
    GET_USER_DESHBOARD_DATA: "/api/tasks/user-dashboard-data", // Get Users Details
    GET_ALL_TASKS: "/api/tasks", //Get all Tasks (Adnib : all, User : only assigned)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get Task by ID
    CREATE_TASK: "/api/tasks", //Create Task Admin only
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //Update Task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete Task Admin only

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update Task Status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update Task Checklist
  },

  REPORT: {
    EXPORT_TASKS: "/api/reports/export/tasks", // GET all Task Report Data in PDF form (Admin only)
    EXPORT_USERS: "/api/reports/export/users", // GET all Users Report Data in PDF form (Admin only)
  },

  IMAGE: {
    UPLOADE_IMAGE: "/api/auth/upload-image",
  },
};
