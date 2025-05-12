import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Settings from "./Pages/Settings";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import ChatPage from "./Pages/ChatPage";
import { authStore } from "./Store/authStore";

const App = () => {
  const { userAuth, checkAuth, checkingAuth } = authStore();

  // check if the user is logged in on page
  // show loader while checking
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth && !userAuth) {
    return;
  }

  return (
    <div className="">
      <Routes>
        <Route path="/" element={ !userAuth ? <LoginPage /> : <Navigate to="/chat" />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/chat" element={userAuth ? <ChatPage /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default App;
