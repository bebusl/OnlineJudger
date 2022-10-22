import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { login, signup } from "../../api/authAPI";
import Cookies from "js-cookie";

export const signUpRequest = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      id,
      password,
      link_key = "",
    }: {
      name: string;
      id: string;
      password: string;
      link_key: string;
    },
    thunkAPI
  ) => {
    const response = await signup(name, id, password, link_key);
    if (response) return response;
    return thunkAPI.rejectWithValue(response);
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async (
    {
      id,
      password,
      link_key = "",
    }: {
      id: string;
      password: string;
      link_key?: string;
    },
    thunkAPI
  ) => {
    const a = await login({ id, password, link_key });

    if (a) return { id, ...a };
    return thunkAPI.rejectWithValue(a);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { isLogin: false, id: "bebus1998" },
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
    logoff: (state) => {
      state.isLogin = false;
      state.id = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      Cookies.set("auth_token", `Bearer ${action.payload.data.access_token}`);
      state.isLogin = true;
      state.id = action.payload.id;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(signUpRequest.fulfilled, (state, action) => {});
  },
});

export const { logoff } = authSlice.actions;

export default authSlice.reducer;
