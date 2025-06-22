import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchEngineers = createAsyncThunk("engineers/fetch", async () => {
  const res = await axiosInstance.get("/engineers");
  return res.data;
});

export const createEngineer = createAsyncThunk(
  "engineers/create",
  async (data) => {
    const res = await axiosInstance.post("/engineers", data);
    console.log("Created engineer:", res.data);
    return res.data;
  }
);

export const updateEngineer = createAsyncThunk(
  "engineers/update",
  async ({ id, data }) => {
    const res = await axiosInstance.put(`/engineers/${id}`, data);
    return res.data;
  }
);

export const deleteEngineer = createAsyncThunk(
  "engineers/delete",
  async (id) => {
    await axiosInstance.delete(`/engineers/${id}`);
    return id;
  }
);

const engineerSlice = createSlice({
  name: "engineers",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEngineers.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createEngineer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEngineer.fulfilled, (state, action) => {
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteEngineer.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      });
  },
});

export default engineerSlice.reducer;