import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import notiReducer from "./slice/notiSlice";

const reducer = { auth: authReducer, noti: notiReducer };

const makeStore = () =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

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
