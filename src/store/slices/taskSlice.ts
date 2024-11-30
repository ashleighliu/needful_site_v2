// ############################################################
/**
 * @todo Document this
 */
// ############################################################

import { createSlice } from "@reduxjs/toolkit";
import taskSliceIniState from "../storeHelpers/taskData";

const taskSlice = createSlice({
  name: "task",
  initialState: taskSliceIniState,
  reducers: {
    setUserTasks(state, { payload }) {
      state.tasks = payload;
    },
  },
});

export const getUserTasks = (state) => state.task.tasks;

export const { setUserTasks } = taskSlice.actions;

export default taskSlice.reducer;
