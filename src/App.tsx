import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import "@mantine/core/styles.css";
import { auth } from "./services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { MantineProvider } from "@mantine/core";
import store from "./store/store";
import { Router } from "./Router";
import { theme } from "./theme";

import {
  selectIsLoggedIn,
  setIsLoggedIn,
  setUserInfo,
  setIsAudioDownloaded,
  getUserInfo,
  setIsAuthLoading,
  initializeFromCache,
} from "./store/slices/userSlice";

import AuthService from "./services/authService";

function AuthWrapper() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUserInfo = useSelector(getUserInfo);

  const setCurrentUserInfo = async (userId: string) => {
    const cachedUser = localStorage.getItem("userInfo");
    if (cachedUser) {
      const parsedUser = JSON.parse(cachedUser);
      const cacheTimestamp = localStorage.getItem("userInfoTimestamp");
      const now = Date.now();

      // Check if cache is less than 1 hour old
      if (cacheTimestamp && now - parseInt(cacheTimestamp) < 3600000) {
        dispatch(setUserInfo(parsedUser));
        return;
      }
    }

    const currentUserInfo = await AuthService.getCurrentUserData(userId);
    if (currentUserInfo) {
      console.log("UserInfo ====================> ", currentUserInfo);
      dispatch(setUserInfo(currentUserInfo));

      localStorage.setItem("userInfo", JSON.stringify(currentUserInfo));
      localStorage.setItem("userInfoTimestamp", Date.now().toString());
    } else {
      console.log("Failed to retrieve user info");
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    if (user && user.email) {
      dispatch(initializeFromCache());
      dispatch(setIsLoggedIn(true));
      await setCurrentUserInfo(user.uid);
    } else {
      dispatch(setIsLoggedIn(false));
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userInfoTimestamp");
    }

    dispatch(setIsAuthLoading(false));
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthStateChanged);

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return <Router />;
}

export default function App() {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <AuthWrapper />
      </MantineProvider>
    </Provider>
  );
}
