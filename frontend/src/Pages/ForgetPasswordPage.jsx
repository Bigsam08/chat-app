import { useState } from "react";
import { Link } from "react-router-dom";
import FormField from "../Component/FormField";
import CustomButton from "../Component/CustomButton";
import Spinner from "../Component/Loaders/Spinner";
import { authStore } from "../Store/authStore";
import { toast } from "react-hot-toast";
import { EnvelopeIcon } from "@heroicons/react/24/outline"; // icons
import { motion as Motion, AnimatePresence } from "framer-motion";

const ForgetPasswordPage = () => {
  const { forgetPassword } = authStore();

  const [email, setEmail] = useState();

  // submit user data to backend for authentication
  const submitData = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Your registered email is required");
    forgetPassword(email);
  };

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
              FORGOT PASSWORD?
            </p>
            <p className="text-center px-8 mb-8 text-sm text-gray-500">
              No issues, fill in your email to regain control.
            </p>

            {/* Form */}
            <form onSubmit={submitData} className="space-y-4">
              <FormField
                name="email"
                label="Email"
                placeholder="johndoe@gmail.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                icon={<EnvelopeIcon className="w-5 h-5" />}
              />

              <CustomButton
                type="submit"
                text="Reset Password"
                loadingText="Processing..."
                loadingComponent={<Spinner />}
              />
            </form>

            {/* Divider */}
            <hr className="my-6 border-gray-200" />

            {/* Links */}
            <div className="text-sm text-center px-2 text-gray-500">
              <Link
                to="/"
                className="hover:text-gray-900 transition-colors duration-200"
              >
                &lt; Back to login
              </Link>
            </div>
          </Motion.div>
        </AnimatePresence>
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

export default ForgetPasswordPage;
