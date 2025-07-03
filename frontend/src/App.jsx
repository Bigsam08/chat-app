import  { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { authStore } from "./Store/authStore";
import MainLoader from "./Component/Loaders/MainLoader";
import useThemeStore from "./Store/ThemeStore";

// Lazy load pages
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const Settings = lazy(() => import("./Pages/Settings"));
const ForgetPasswordPage = lazy(() => import("./Pages/ForgetPasswordPage"));
const ResetPasswordPage = lazy(() => import("./Pages/ResetPasswordPage"));
const ChatPage = lazy(() => import("./Pages/ChatPage"));

const App = () => {
  const { theme } = useThemeStore();

  const userAuth = authStore((state) => state.userAuth);
  const checkingAuth = authStore((state) => state.checkingAuth);
  const checkAuth = authStore((state) => state.checkAuth);

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkAuth();
    }, 150); // 150–300ms delay to avoid flickering

    return () => clearTimeout(timeout);
  }, [checkAuth]);

  return (
    <div className={`theme-wrapper ${theme}`}>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route
            path="/"
            element={!userAuth ? <LoginPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/sign-up"
            element={!userAuth ? <SignUpPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/settings"
            element={userAuth ? <Settings /> : <Navigate to="/" />}
          />
          <Route
            path="/forget-password"
            element={!userAuth ? <ForgetPasswordPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/reset-password/:token"
            element={!userAuth ? <ResetPasswordPage /> : <Navigate to="/chat" />}
          />
          <Route
            path="/chat"
            element={
              checkingAuth ? (
                <MainLoader />
              ) : userAuth ? (
                <ChatPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;

// The `theme-wrapper` class should handle the theme switching based on the `theme` state from the `useThemeStore`.
// The `authStore` should be properly set up to manage