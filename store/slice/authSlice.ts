import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { login, signup, getUser, logout } from "../../api/authAPI";
import { addNoti } from "./notiSlice";

import { SignInRequest, SignUpRequest } from "../../api/scheme/auth";
import {
  removeAuthorizationCookie,
  setAuthorizationCookie,
} from "../../utils/authUtils";

const misteryManSrc =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const initialState = {
  isLogin: false,
  isAuthenticating: false,
  id: "",
  avatar: misteryManSrc,
  name: "",
  roles: [],
  links: [],
  email: "",
};

export const signUpRequest = createAsyncThunk(
  "auth/signup",
  async (props: Partial<SignUpRequest>, thunkAPI) => {
    try {
      const response = await signup(props);
      if (response.data.success) {
        thunkAPI.dispatch(
          addNoti({
            id: Date.now(),
            message: "회원가입에 성공했습니다.",
            variant: "success",
          })
        );
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.data.err_msg);
      }
    } catch (e) {
      thunkAPI.dispatch(
        addNoti({
          id: Date.now(),
          message: "회원가입에 실패했습니다.",
          variant: "error",
        })
      );
    }
  }
);

export const loginRequest = createAsyncThunk(
  "auth/login",
  async ({ email, password, link_key = "" }: SignInRequest, thunkAPI) => {
    const loginInfo = await login({ email, password, link_key });
    if (loginInfo.data.success) {
      thunkAPI.dispatch(
        addNoti({
          id: Date.now(),
          message: "로그인을 성공했습니다.",
          variant: "success",
        })
      );
      thunkAPI.dispatch(addUserData(loginInfo.data.user));
      return loginInfo.data;
    }
    thunkAPI.dispatch(
      addNoti({
        id: Date.now(),
        message: loginInfo.data.err_msg,
        variant: "error",
      })
    );
    return thunkAPI.rejectWithValue(loginInfo);
  }
);

export const logoff = createAsyncThunk("auth/logoff", async (_, thunkAPI) => {
  try {
    const res = await logout();
    if (res.data.success) {
      thunkAPI.dispatch(removeToken());
      return res;
    }
  } catch (e) {
    console.log("ERROR", e);
  }
});

export const getUserData = createAsyncThunk(
  "auth/getMe",
  async (_, thunkAPI) => {
    const userInfo = await getUser();
    if (userInfo.data?.success) {
      thunkAPI.dispatch(addUserData(userInfo.data.user));
      return userInfo.data.user;
    }
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
    removeToken: (state) => {
      removeAuthorizationCookie();
      return Object.assign({}, initialState);
    },
    addUserData: (state, action) => {
      state.isLogin = true;
      state.isAuthenticating = false;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.name = action.payload.name;
      state.avatar = action.payload.links[0]?.avatar_url || misteryManSrc;
      state.links = action.payload.links;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      setAuthorizationCookie(action.payload.access_token);
      state.isAuthenticating = false;
    });
    builder.addCase(loginRequest.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(loginRequest.rejected, (state) => {
      authSlice.caseReducers.removeToken(state);
      state.isAuthenticating = false;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.isAuthenticating = true;
    });
    builder.addCase(getUserData.fulfilled, (state) => {
      state.isAuthenticating = false;
    });
    builder.addCase(getUserData.rejected, (state) => {
      authSlice.caseReducers.removeToken(state);
      state.isAuthenticating = false;
    });
    builder.addCase(logoff.fulfilled, (state) => {
      authSlice.caseReducers.removeToken(state);
    });
  },
});

export const { removeToken, addUserData } = authSlice.actions;

export default authSlice.reducer;
