// ############################################################
/**
 * @todo Document this
 */
// ############################################################

import { createSlice } from "@reduxjs/toolkit";
import userSliceIniState from "../storeHelpers/userData";

const userSlice = createSlice({
  name: "user",
  initialState: userSliceIniState,
  reducers: {
    setIsLoggedIn(state, { payload }) {
      state.isLoggedIn = payload;
    },
    setUserInfo(state, { payload }) {
      state.userInfo = payload;
    },
    setIsAudioDownloaded(state, { payload }) {
      state.isAudioDownloaded = payload;
    },
  },
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const getUserInfo = (state) => state.user.userInfo;

export const getIsAudioDownloaded = (state) => state.user.isAudioDownloaded;

export const { setIsLoggedIn, setUserInfo, setIsAudioDownloaded } =
  userSlice.actions;

export default userSlice.reducer;
