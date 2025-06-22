import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import projectReducer from '../features/projects/projectSlice';
import engineerReducer from '../features/engineers/engineerSlice';
import assignmentReducer from '../features/assignments/assignmentSlice';
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects:projectReducer,
    engineers: engineerReducer,
    assignments: assignmentReducer,
    dashboard: dashboardReducer,
  },
});
