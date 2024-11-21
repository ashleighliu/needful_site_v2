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
} from "./store/slices/userSlice";

import AuthService from "./services/authService";

function AuthWrapper() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUserInfo = useSelector(getUserInfo);

  const setCurrentUserInfo = async (userId: string) => {
    const currentUserInfo = await AuthService.getCurrentUserData(userId);
    if (currentUserInfo) {
      console.log("UserInfo ====================> ", currentUserInfo);
      dispatch(setUserInfo(currentUserInfo));
    } else {
      console.log("Failed to retrieve user info");
    }
  };

  const handleAuthStateChanged = async (user: any) => {
    if (user && user.email) {
      const now = new Date();
      // const appStartTime = now.toISOString();
      // dispatch(setAppStartTime(appStartTime));
      dispatch(setIsLoggedIn(true));
      await setCurrentUserInfo(user.uid);
      // await setCurrentTasks(user.email);
      // await setMeditationHistorys(user.email);
    } else {
      dispatch(setIsLoggedIn(false));
    }
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
