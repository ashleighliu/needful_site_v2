import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './pages/Landing.page';
import { LoginPage } from './pages/Login.page';
import { SignUpPage } from './pages/SignUp.page';
import { WelcomePage } from './pages/Welcome.page';
import { ContactPage } from './pages/Contact.page';
import { SSOLoginPage } from './pages/SSOLogin.page';
import { VerifyEmailPage } from './pages/VerifyEmail.page';
import { HomePage } from './pages/Home.page';
import { GrantAccessFormPage } from './pages/GrantAccessForm.page';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/sso-login',
    element: <SSOLoginPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/grant-access',
    element: <GrantAccessFormPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
