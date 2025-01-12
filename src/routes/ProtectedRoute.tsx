import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsAuthLoading,
} from "../store/slices/userSlice";
import { Loader, Center, Container } from "@mantine/core";
import AuthService from "@/services/authService";
import { setUserInfo } from "@/store/slices/userSlice";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useDispatch();
  const auth = getAuth();
  // Confirm the link is a sign-in with email link.

  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt("Please provide your email for confirmation");
    }
    if (!email) {
      return;
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userData = await AuthService.getCurrentUserData(
          userCredential.user.uid
        );
        window.localStorage.removeItem("emailForSignIn");
        dispatch(setUserInfo(userData));
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const isAuthLoading = useSelector(selectIsAuthLoading);

  if (isAuthLoading) {
    return (
      <Container style={{ minWidth: "100%", minHeight: "100vh" }}>
        <Center style={{ minHeight: "100vh" }}>
          <Loader color="blue" />
        </Center>
      </Container>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
