import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../store/slices/userSlice";

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  // If user is logged in and tries to access login/signup pages,
  // redirect them to home
  if (isLoggedIn && ["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
