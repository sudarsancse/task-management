export const BASE_URL = "http://localhost:5000";

//utils/apiPath.js
export const API_PATH = {
  AUTH: {
    REGISTER: "/api/auth/register", //Register a new user (Admin or Member)
    LOGIN: "/api/auth/login", //Authenticate user & return JWT Token
    GET_PROFILE: "/api/auth/profile", //Get login user details
  },

  USERS: {
    GET_ALL_USER: "/api/users",
    GET_USER_BY_ID: (taskId) => `/api/users/${taskId}`,
    CREATE_USER: "/api/users",
    UPDATE_USER: (taskId) => `/api/users/${taskId}`,
    DELETE_USER: (taskId) => `/api/users/${taskId}`,
  },

  TASK: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",
    GET_USER_DESHBOARD_DATA: "/api/tasks/user-dashboard-data",
    GET_ALL_TASKS: "/api/tasks",
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,
    CREATE_TASK: "/api/tasks",
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
  },

  REPORT: {
    EXPORT_TASKS: "/api/reports/export/tasks",
    EXPORT_USERS: "/api/reports/export/users",
  },
};
