import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
  },
});

export default store;
