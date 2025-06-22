import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchAssignments = createAsyncThunk(
  "assignments/fetch",
  async () => {
    const res = await axiosInstance.get("/assignments");
    return res.data;
  }
);

export const createAssignment = createAsyncThunk(
  "assignments/create",
  async (data) => {
    const res = await axiosInstance.post("/assignments", data);
    return res.data;
  }
);

export const updateAssignment = createAsyncThunk(
  "assignments/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(`/assignments/${id}`, data);
    return res.data;
  }
);

export const deleteAssignment = createAsyncThunk(
  "assignments/delete",
  async (id) => {
    await axiosInstance.delete(`/assignments/${id}`);
    return id;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: {
    items: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const index = state.items.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export default assignmentSlice.reducer;
