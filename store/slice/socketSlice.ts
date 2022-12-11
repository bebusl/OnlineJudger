import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  runResult: {},
  judgeResult: [],
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.auth,
    }),
    recieveRunMessage: (state, action) => {
      state.runResult = action.payload;
    },
    recieveJudgeMessage: (state, action) => {
      state.judgeResult.push(action.payload);
    },
  },
});

export const { recieveJudgeMessage, recieveRunMessage } = socketSlice.actions;

export default socketSlice.reducer;
