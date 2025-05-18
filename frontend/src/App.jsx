import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {  useEffect } from "react";

import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Settings from "./Pages/Settings";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ChatPage from "./Pages/ChatPage";
import { authStore } from "./Store/authStore";
import MainLoader from "./Component/Loaders/MainLoader";

import useThemeStore from "./Store/ThemeStore"; // theme store toggler

const App = () => {
  const { theme } = useThemeStore();

  const userAuth = authStore((state) => state.userAuth);
  const checkingAuth = authStore((state) => state.checkingAuth);
  const checkAuth = authStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

   useEffect(() => {
    console.log("Current userAuth app.js:", userAuth);
  }, [userAuth]);

  if (checkingAuth) {
    return <MainLoader />;
  }

  return (
    <div className={`theme-wrapper ${theme}`}>
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
          element={userAuth ? <ChatPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
