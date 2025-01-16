import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { LandingPage } from "./pages/Landing.page";
import { LoginPage } from "./pages/Login.page";
import { SignUpPage } from "./pages/SignUp.page";
import { WelcomePage } from "./pages/Welcome.page";
import { ContactPage } from "./pages/Contact.page";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicy.page";
import { SSOLoginPage } from "./pages/SSOLogin.page";
import { VerifyEmailPage } from "./pages/VerifyEmail.page";
import { HomePage } from "./pages/Home.page";
import { GrantAccessFormPage } from "./pages/GrantAccessForm.page";
import { BlogPage } from "./pages/Blog.page";
import { BlogPostPage } from "./pages/BlogPost.page";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup/continue",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  {
    path: "/welcome",
    element: (
      <PublicRoute>
        <WelcomePage />
      </PublicRoute>
    ),
  },
  {
    path: "/contact",
    element: (
      <PublicRoute>
        <ContactPage />
      </PublicRoute>
    ),
  },
  {
    path: "/privacy",
    element: (
      <PublicRoute>
        <PrivacyPolicyPage />
      </PublicRoute>
    ),
  },
  {
    path: "/sso-login",
    element: (
      <PublicRoute>
        <SSOLoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <PublicRoute>
        <VerifyEmailPage />
      </PublicRoute>
    ),
  },
  {
    path: "/blog",
    element: (
      <PublicRoute>
        <BlogPage />
      </PublicRoute>
    ),
  },
  {
    path: "/blog/:post",
    element: (
      <PublicRoute>
        <BlogPostPage />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/grant-access",
    element: (
      <ProtectedRoute>
        <GrantAccessFormPage />
      </ProtectedRoute>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
