import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { LANGUAGES_TYPE } from "../../utils/constants/language";

interface ResultList {
  id: 0;
  cpu_time: 0;
  real_time: 0;
  memory: 0;
  signal: 0;
  exit_code: 0;
  error: 0;
  result: 0;
  correct: true;
  output?: string;
}

interface RunResult {
  created_at: Date;
  updated_at: Date;
  id: string;
  user_id: string;
  problem_id: number;
  code: string;
  language: LANGUAGES_TYPE;
  status: string;
  memory: number;
  real_time: number;
  code_length: number;
  result_list?: ResultList[];
  like: number;
  judge: boolean;
}

const initialState = {
  isRunning: false,
  isError: false,
  runResult: null,
  judgeResult: [],
} as {
  isRunning: boolean;
  isError: boolean;
  runResult: null | RunResult;
  judgeResult: RunResult[];
};

export const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.socket,
    }),
    pendingRunResult: (state) => {
      state.isRunning = true;
    },
    receiveRunMessage: (state, action) => {
      state.isRunning = false;
      if (action.payload.runResult?.result_list.length() <= 1) {
        state.isError = true;
      }
      state.runResult = action.payload;
    },
    resetRunMessage: (state) => {
      state.runResult = null;
      state.isRunning = false;
      state.isError = false;
    },
    receiveJudgeMessage: (state, action) => {
      state.judgeResult.push(action.payload);
    },
  },
});

export const {
  receiveJudgeMessage,
  receiveRunMessage,
  resetRunMessage,
  pendingRunResult,
} = socketSlice.actions;

export default socketSlice.reducer;
