import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from "react-toastify";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

import { authStore } from "../Store/authStore";

const SignUpPage = () => {
  const { registrationSuccess, register, isRegistering } = authStore();
  const navigate = useNavigate();

  // set state for input fields

  const userdata = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(userdata);

  // get user input
  const getValue = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
        ...prev,
        [name]: value
    }))
  };

  // submit data to backend
  const submitRegistration = (e) => {
    e.preventDefault();
    if (!data.email || !data.userName || !data.password || !data.confirmPassword) return toast.error("All fields is required")
    if (data.password !== data.confirmPassword ) return toast.error("Passwords do not match");
    register(data);
  };

  // navigation
  useEffect(() => {
    if (registrationSuccess) {
      navigate("/");
    }
  }, [navigate, registrationSuccess]);

  return (
    <div className="bg-custom h-screen flex justify-center items-center p-5">
      {/**-------- middle container------- */}
      <div className="flex flex-col md:flex-row lg:w-3/5 justify-between p-5">
        {/** form box */}
        <div className="relative bg-white px-3 pt-10 w-full md:w-1/2 rounded-3xl shadow-2xl order-2 md:order-1 text-sm">
          <PersonIcon
            className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 bg-white rounded-full text-gray-600 border-t-4"
            sx={{
              fontSize: {
                xs: "60px", // mobile (default)
                sm: "80px", // from small screens and above
              },
            }}
          />
          <h1 className="text-2xl font-bold text-gray-600 text-center tracking-widest">
            Create account
            <span className="inline-block animate-bounce">📝 </span>
          </h1>
          <p className="text-center text-sm text-gray-500 font-thin">
            Get a free account in seconds
          </p>
          <form onSubmit={submitRegistration} className=" mt-10 p-2">
              <div className="relative mb-5">
              <PersonIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="text"
                name="userName"
                value={data.userName}
                onChange={getValue}
                placeholder="samjoe21"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
            <div className="relative mb-5">
              <EmailIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={getValue}
                placeholder="example@gmail.com"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
           
            <div className="relative mb-5">
              <LockIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={getValue}
                placeholder="create password"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
             <div className="relative mb-5">
              <LockIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={getValue}
                placeholder="retype password"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isRegistering}
              className="tracking-widest bg-custom hover:bg-green-500 w-full text-gray-200 rounded-xl py-3 transition-all duration-500 ease-out mb-5 disabled:cursor-not-allowed shadow-inner"
            >
              {isRegistering ? "Creating account..." : "Create Acount "}
            </button>
          </form>
          <hr />
          <div className=" flex items-center justify-between my-3 text-sm text-gray-400 px-2">
            <Link to="/" className="hover:text-gray-800">
              {" "}
              Back to Login{" "}
            </Link>
          </div>
        </div>
        {/** message box */}
        <div className="flex flex-col justify-center items-center mb-10 text-white text-center w-full md:w-1/2 p-3 order-1 md:order-2">
          <h1 className="text-center  text-2xl font-bold mb-2 text-shadow-lg">
            {" "}
            Q Chat
          </h1>
          <p className="text-sm sm:text-md md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            dignissimos, ex voluptas consequatur voluptatum harum eaque facere
            dolores, quod vero et fuga laboriosam non, corporis quibusdam
            inventore! Vitae, dolorem deserunt. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Alias reiciendis excepturi a qui natus
            voluptate ipsam, ut nisi quibusdam numquam sint dignissimos
            aspernatur laudantium id aperiam obcaecati, vel dolorum culpa?
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
