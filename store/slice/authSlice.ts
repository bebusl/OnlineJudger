import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { login, signup, getUser } from "../../api/authAPI";
import Cookies from "js-cookie";
import { addNoti } from "./notiSlice";

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
    thunkAPI.dispatch(
      addNoti({
        id: Date.now(),
        message: "로그인을 성공했습니다.",
        variant: "success",
      })
    );
    if (a) return { id, ...a };
    return thunkAPI.rejectWithValue(a);
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
  initialState: { isLogin: false },
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
      Cookies.set(
        "Authorization",
        `Bearer ${action.payload.data.access_token}`,
        {
          secure: true,
          sameSite: "None",
        }
      );
      state.isLogin = true;
      state.id = action.payload.id;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isLogin = false;
    });
    builder.addCase(signUpRequest.fulfilled, (state, action) => {});
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLogin = true;
      state.userData = action.payload;
    });
    builder.addCase(getUserData.rejected, (state) => {
      authSlice.caseReducers.logoff(state);
    });
  },
});

export const { logoff } = authSlice.actions;

export default authSlice.reducer;

// TODO : Cookie에서 sameSite, secure 옵션 변경.
// 보안 이슈 관련 커밋할 떄 같이 커밋할 것.
