import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const addNoti = createAsyncThunk(
  "noti/add",
  async (
    { id, message, variant }: { id: number; message: string; variant: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(add({ id, message, variant }));
    await setTimeout(() => {
      console.log(id);
      thunkAPI.dispatch(remove(id));
    }, 3000);
  }
);

export const notiSlice = createSlice({
  name: "noti",
  initialState: {
    message: [] as { id: number; message: string; variant: string }[],
  },
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
    add: (state, action) => {
      state.message.push(action.payload);
    },
    remove: (state, action) => {
      const after = state.message.filter((st) => st.id === action.payload);
      console.log("!!!", action.payload, after);
      state.message.splice(1, 1);
    },
  },
});

export const { add, remove } = notiSlice.actions;

export default notiSlice.reducer;
