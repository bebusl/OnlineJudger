import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import notiReducer from "./slice/notiSlice";
import socketReducer from "./slice/socketSlice";
import socketManager from "./middleware/socketManager";

const reducer = { auth: authReducer, noti: notiReducer, socket: socketReducer };

const generateStore = () =>
  configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(socketManager),
  });

const store = generateStore();

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  StoreState,
  unknown,
  Action
>;

export default store;
