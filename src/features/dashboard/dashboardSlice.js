import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Step 1: Async function to fetch dashboard summary
export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",
  async () => {
    const response = await axiosInstance.get("/dashboard/summary");
    return response.data;
  }
);

// Step 2: Create the slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalEngineers: 0,
    totalProjects: 0,
    totalAssignments: 0,
    engineerUtilization: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.totalEngineers = action.payload.totalEngineers;
        state.totalProjects = action.payload.totalProjects;
        state.totalAssignments = action.payload.totalAssignments;
        state.engineerUtilization = action.payload.engineerUtilization;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;