import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const login = createAsyncThunk("auth/login", async () => {
  return "hi";
});

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLogin: false, id: "bebus1998" },
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
