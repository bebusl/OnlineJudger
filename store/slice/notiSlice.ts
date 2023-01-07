import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { variantType } from "../../styles/theme";

export const addNoti = createAsyncThunk(
  "noti/add",
  async (
    { id, message, variant }: { id: number; message: string; variant: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(add({ id, message, variant }));
    await setTimeout(() => {
      thunkAPI.dispatch(remove(id));
    }, 3000);
  }
);

export const notiSlice = createSlice({
  name: "noti",
  initialState: {
    message: [] as {
      id: number;
      message: string;
      variant: variantType;
    }[],
  },
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.noti,
    }),
    add: (state, action) => {
      state.message.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.message.findIndex(
        (noti) => noti.id === action.payload
      );
      state.message.splice(index, 1);
    },
  },
});

export const { add, remove } = notiSlice.actions;

export default notiSlice.reducer;
