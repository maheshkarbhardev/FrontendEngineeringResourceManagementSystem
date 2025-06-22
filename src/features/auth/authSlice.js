import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, registerUserAPI } from "./authAPI";
import { jwtDecode } from "jwt-decode";

// Decode token from localStorage on load
let token = localStorage.getItem("token");
let role = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    role = decoded.role?.toLowerCase(); // normalize to lowercase
  } catch (err) {
    token = null;
    role = null;
    localStorage.clear(); // optional: clear corrupted token
  }
}

const initialState = {
  user: null,
  token: token,
  role: role,
  status: "idle",
  error: null,
};

export const loginUser = createAsyncThunk("auth/loginUser", async (formData) => {
  const res = await loginUserAPI(formData);
  return res;
});

export const registerUser = createAsyncThunk("auth/registerUser", async (formData) => {
  const res = await registerUserAPI(formData);
  return res;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token } = action.payload;
        const decoded = jwtDecode(token);
        const role = decoded.role?.toLowerCase(); // normalize

        state.token = token;
        state.role = role;

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // handle registration if needed
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;