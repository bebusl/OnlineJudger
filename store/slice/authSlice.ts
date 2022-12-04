import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { login, signup, getUser } from "../../api/authAPI";
import { addNoti } from "./notiSlice";
import Cookies from "js-cookie";
import { addHours } from "../../utils/dateUtils";

const dummyImg =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=50";

const initialState = { isLogin: false, id: "", roles: [] };

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
    const loginInfo = await login({ id, password, link_key });
    if (loginInfo.data.success) {
      thunkAPI.dispatch(
        addNoti({
          id: Date.now(),
          message: "로그인을 성공했습니다.",
          variant: "success",
        })
      );
      const { access_token, user } = loginInfo.data;
      const roles = user.roles;
      const name = user.name;
      const avatar = user.avatar_url;
      return { id, access_token, roles, name, avatar };
    }
    return thunkAPI.rejectWithValue(loginInfo);
  }
);

export const getUserData = createAsyncThunk(
  "auth/getMe",
  async (_, thunkAPI) => {
    const userInfo = await getUser();
    if (userInfo.data?.success) return userInfo.data.user;
    return thunkAPI.rejectWithValue(userInfo);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
    logoff: (state) => {
      Cookies.remove("Authorization", {
        secure: false,
        sameSite: "Strict",
      });

      state.isLogin = false;
      state.id = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      Cookies.set("Authorization", `Bearer ${action.payload.access_token}`, {
        secure: true,
        sameSite: "None",
        expires: addHours(1),
      });
      state.isLogin = true;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar || dummyImg;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userData = action.payload;
      state.roles = action.payload.roles;
      state.roles = action.payload.roles;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar || dummyImg;
    });
    builder.addCase(getUserData.rejected, (state) => {
      authSlice.caseReducers.logoff(state);
    });
  },
});

export const { logoff } = authSlice.actions;

export default authSlice.reducer;
