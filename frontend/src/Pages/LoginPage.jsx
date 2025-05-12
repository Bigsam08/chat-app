import { Link, useNavigate } from "react-router-dom";
import { authStore } from "../Store/authStore";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = { email, password };

  const { loginSuccess, logginIn, login } = authStore();

  const submitData = (e) => {
    e.preventDefault();
    login(data);
  };

  useEffect(() => {
    if (loginSuccess) {
      navigate("/chat");
    }
  }, [navigate, loginSuccess]);
  return (
    <div className="bg-custom h-screen flex justify-center items-center p-5">
      {/**-------- middle container------- */}
      <div className="flex flex-col md:flex-row lg:w-3/5 justify-between p-5">
        {/** form box */}
        <div className="relative bg-white px-3 pt-10 w-full md:w-1/2 rounded-3xl shadow-2xl order-2 md:order-1">
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
            Welcome Back
            <span className="inline-block animate-bounce">😀 </span>
          </h1>
          <p className="text-center text-sm text-gray-500 font-thin">
            sign into your account
          </p>
          <form onSubmit={submitData} className=" mt-10 p-2">
            <div className="relative mb-5">
              <EmailIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
            <div className="relative mb-5">
              <LockIcon className="text-gray-600 absolute top-3 left-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter password"
                className="w-full py-3 px-9  bg-gray-200 rounded-xl text-gray-600 focus:outline-none hover:shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={logginIn}
              className="tracking-widest bg-custom hover:bg-green-500 w-full text-gray-200 rounded-xl py-3 transition-all duration-500 ease-out mb-5 disabled:cursor-not-allowed hover:shadow-inner"
            >
              {logginIn ? "Logging In ..." : "Login "}
            </button>
          </form>{" "}
          <hr />
          <div className=" flex items-center justify-between my-3 text-sm text-gray-400 px-2">
            <Link to="/sign-up" className="hover:text-gray-800">
              {" "}
              Create account{" "}
            </Link>
            <Link to="/forget-password" className="hover:text-gray-800">
              forget password{" "}
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

export default LoginPage;
