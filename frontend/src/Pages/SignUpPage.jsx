import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../Component/FormField"; // input field component
import CustomButton from "../Component/CustomButton"; // create account button
import Spinner from "../Component/Loaders/Spinner";
import { authStore } from "../Store/authStore"; // zustand global store
import { toast } from "react-hot-toast"; // show ui notification

import { isPasswordStrong } from "../Utilis/password.test"; // test the user password
import { AnimatePresence, motion as Motion } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline"; // icons from heroicons v2

const SignUpPage = () => {
  const navigate = useNavigate();
  const { registrationSuccess, register, isRegistering } = authStore();

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // VALIDATE USER INPUT FIELDS
  const validation = () => {
    if (!data.userName) return toast.error("User name is required"), false;
    if (!data.email) return toast.error("Email is required"), false;
    if (!data.password) return toast.error("Password is required"), false;
    if (data.password !== data.confirmPassword)
      return toast.error("Passwords do not match"), false;
    if (!isPasswordStrong(data.password))
      return (
        toast.error(
          "Password must be 8+ chars long, with uppercase, lowercase, number & specialCharacter"
        ),
        false
      );
    return true;
  };

  /**
   * Trim user data email and userName
   * before sending to backend
   * submit user data to backend for authentication
   */

  const submitData = (e) => {
    e.preventDefault();
    if (!validation()) return;

    // trim data and send
    const cleanedData = {
      ...data,
      userName: data.userName.trim(),
      email: data.email.trim(),
      password: data.password,
    };
    register(cleanedData); // authstore function to send details to backend
  };
  // react to authentication response
  // if success navigate to the login page
  useEffect(() => {
    if (registrationSuccess) {
      navigate("/");
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="grid md:grid-cols-2 md:p-5 p-2 min-h-screen w-full bg-custom">
      {/** form */}
      <div className="relative flex justify-center items-center px-4 md:px-10 py-10 min-h-screen">
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
              <img src="/chatlogo.png" alt="Q chat logo" className="h-64" />
            </div>

            {/* Welcome Message */}
            <p className="text-center text-base text-gray-600 mt-3  font-sans font-extrabold">
              Create account
              <span className="inline-block animate-bounce text-2xl ml-1">
                😀
              </span>
            </p>
            <p className="text-center mb-8 text-sm text-gray-500">
              Get a free account in seconds.
            </p>

            {/* Form */}
            <form onSubmit={submitData} className="space-y-4">
              <FormField
                name="userName"
                label="User name"
                placeholder="johndoe2"
                type="text"
                onChange={(e) => setData({ ...data, userName: e.target.value })}
                value={data.userName}
                icon={<UserIcon className="w-5 h-5" />}
              />
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
                placeholder="Create password"
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
              />
              <FormField
                icon={<LockClosedIcon className="h-5 w-5" />}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="retype password"
                type="password"
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
                value={data.confirmPassword}
              />
              <CustomButton
                type="submit"
                isLoading={isRegistering}
                text="Create Account"
                loadingText="Creating account..."
                loadingComponent={<Spinner />}
              />
            </form>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Links */}
            <div className="text-sm flex justify-center px-2 text-gray-500">
              <Link
                to="/"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                &lt; Back to login
              </Link>
            </div>
          </Motion.div>
        </AnimatePresence>
        <section className="absolute bottom-5 text-xs">
          <p>
            app developed by Agbebi Oluwashola ©️ {new Date().getFullYear()}{" "}
          </p>
        </section>
      </div>

      {/** text */}
      <div className="hidden md:flex items-center justify-center rounded-2xl md:p-16">
        <div className="flex flex-col items-center text-center p-6 max-w-md">
          <img
            src="/chat3.svg"
            alt="Secure chat image"
            className="w-80 h-auto mb-6"
          />

          <h2 className="text-2xl font-semibold mb-3 leading-tight">
            Chat securely and instantly
          </h2>

          <p className="text-sm text-dim mb-4 leading-relaxed">
            Experience real-time conversations in a fully encrypted, fast, and
            intuitive messaging platform built for modern communication.
          </p>

          <div className="bg-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            🔒 End-to-end encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
