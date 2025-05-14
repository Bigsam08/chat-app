import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../Component/FormField";
import CustomButton from "../Component/CustomButton";
import Spinner from "../Component/Spinner";
import { authStore } from "../Store/authStore";
import { toast } from "react-hot-toast";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline"; // icons
import { motion as Motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginSuccess, login, logginIn } = authStore();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // submit user data to backend for authentication
  const submitData = (e) => {
    e.preventDefault();
    if (!data.email || !data.password)
      return toast.error("All fields required");

    login(data);
  };
  // react to authentication response
  // if success navigate to the chat page
  useEffect(() => {
    if (loginSuccess) {
      navigate("/chat");
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="grid md:grid-cols-2 md:p-5 p-2 min-h-screen w-full bg-custom">
      {/** form */}
      <div className="flex justify-center items-center px-4 md:px-10 py-10 min-h-screen">
        <AnimatePresence>
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 md:p-10"
          >
            {/* Logo/Title */}
            <div className="flex justify-center">
              <img src="/chatlogo.png" alt="Q chat logo" className="" />
            </div>

            {/* Welcome Message */}
            <p className="text-center text-base font-sans font-extrabold text-gray-600 mt-3">
              Welcome back
              <span className="inline-block animate-bounce text-lg ml-1">
                😀
              </span>
            </p>
            <p className="text-center mb-8 text-sm text-gray-500">
              Secure login to connect instantly.
            </p>

            {/* Form */}
            <form onSubmit={submitData} className="space-y-4">
              <FormField
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                icon={<EnvelopeIcon className="w-5 h-5" />}
              />
              <FormField
                icon={<LockClosedIcon className="h-5 w-5" />}
                name="password"
                label="Password"
                placeholder="Enter password"
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
              />
              <CustomButton
                type="submit"
                isLoading={logginIn}
                text="Login"
                loadingText="Logging in..."
                loadingComponent={<Spinner />}
              />
            </form>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Links */}
            <div className="text-sm flex justify-between px-2 text-gray-500">
              <Link
                to="/sign-up"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Create account
              </Link>
              <Link
                to="/forget-password"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
          </Motion.div>
        </AnimatePresence>
      </div>

      {/** text */}
      <div className="hidden md:flex items-center justify-center rounded-2xl shadow-lg md:p-16">
        <div className="flex flex-col items-center text-center p-6 max-w-md">
          <img
            src="/chat3.svg"
            alt="Secure chat image"
            className="w-80 h-auto mb-6"
          />

          <h2 className="text-2xl font-semibold text-white mb-3 leading-tight">
            Chat securely and instantly
          </h2>

          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            Experience real-time conversations in a fully encrypted, fast, and
            intuitive messaging platform built for modern communication.
          </p>

          <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            🔒 End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
