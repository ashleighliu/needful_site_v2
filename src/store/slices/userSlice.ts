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
    setIsAuthLoading: (state, { payload }) => {
      state.isAuthLoading = payload;
    },
    initializeFromCache: (state) => {
      const cachedUser = localStorage.getItem("userInfo");
      if (cachedUser) {
        state.userInfo = JSON.parse(cachedUser);
      }
    },
  },
});

export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn;

export const selectIsAuthLoading = (state: any) => state.user.isAuthLoading;

export const getUserInfo = (state: any) => state.user.userInfo;

export const getIsAudioDownloaded = (state: any) =>
  state.user.isAudioDownloaded;

export const {
  setIsLoggedIn,
  setUserInfo,
  setIsAudioDownloaded,
  setIsAuthLoading,
  initializeFromCache,
} = userSlice.actions;

export default userSlice.reducer;
