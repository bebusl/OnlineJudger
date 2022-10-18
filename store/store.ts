import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./slice/authSlice";

const reducer = { auth: authReducer };

const makeStore = () => configureStore({ reducer: reducer });

const store = makeStore();

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;

export default store;
