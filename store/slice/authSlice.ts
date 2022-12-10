import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { login, signup, getUser, logout } from "../../api/authAPI";
import { addNoti } from "./notiSlice";
import Cookies from "js-cookie";
import { addHours } from "../../utils/dateUtils";
import { SignInRequest, SignUpRequest } from "../../api/scheme/auth";

const misteryManSrc =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const initialState = {
  isLogin: false,
  id: "",
  avatar: misteryManSrc,
  name: "",
  roles: [],
  links: [],
  email: "",
};

export const signUpRequest = createAsyncThunk(
  "auth/signup",
  async (props: SignUpRequest, thunkAPI) => {
    const response = await signup(props);
    if (response) return response;
    return thunkAPI.rejectWithValue(response);
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
      return loginInfo.data.user;
    }
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
      Cookies.remove("Authorization", {
        secure: false,
        sameSite: "Strict",
      });
      return Object.assign({}, initialState);
    },
    addUserData: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.name = action.payload.name;
      state.avatar = action.payload.links.avatar_url || misteryManSrc;
      state.links = action.payload.links;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      Cookies.set("Authorization", `Bearer ${action.payload.access_token}`, {
        secure: true,
        sameSite: "None",
        expires: addHours(1),
      });
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {});
    builder.addCase(getUserData.rejected, (state) => {
      authSlice.caseReducers.removeToken(state);
    });
    builder.addCase(logoff.fulfilled, (state) => {
      authSlice.caseReducers.removeToken(state);
    });
  },
});

export const { removeToken, addUserData } = authSlice.actions;

export default authSlice.reducer;
