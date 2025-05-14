import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
    <div>
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
