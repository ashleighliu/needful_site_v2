import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsAuthLoading,
} from "../store/slices/userSlice";
import { Loader, Center, Container } from "@mantine/core";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
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
