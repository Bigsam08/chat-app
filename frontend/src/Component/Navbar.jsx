import { useState } from "react";
import { Link } from "react-router-dom";
import { authStore } from "../Store/authStore";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { logout } = authStore(); // import the logout function from store

  /**
   * handle mobile visibility
   */
  const handleVisibility = () => {
    setVisible(!visible);
  };

  /**
   * handle logout button
   */
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="relative flex justify-between items-center h-20 px-3 lg:px-40 border-b border-gray-700">
      {/** logo */}
      <div className="flex gap-1 items-center justify-center">
        {/* <img src="/logopng.png" alt="cht logo" className="w" /> */}
        <h1 className=" text-xl md:text-2xl font-bold"> Q chat</h1>
      </div>
      {/** Links */}
      <div
        className={`absolute md:relative top-full md:top-0 right-1 z-10  px-5 py-5 md:py-0 md:flex items-center lg:space-x-10 text-sm bg-gray-700 md:bg-transparent rounded-b-md md:rounded-none shadow md:shadow-none space-y-3 md:space-y-0 md:pt-0 transition-all duration-300 ${
          visible ? "block " : "hidden md:flex"
        }`}
      >
        {/** settings */}
        <div className="flex items-center space-x-1 p-3">
          <Cog8ToothIcon className="h-6 w-6" />
          <Link to="/settings" className="flex flex-col group">
            Settings
            <span className="border-b border-white w-0 group-hover:w-full transition-all duration-300"></span>{" "}
          </Link>
        </div>
        {/** button  */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-red-600 rounded-lg transition-colors "
          >
            <ArrowRightStartOnRectangleIcon className="w-6 h-6" /> Log out
          </button>
        </div>
      </div>

      {/** mobile menu bar */}
      <div className="block md:hidden">
        <EllipsisVerticalIcon className=" w-7 h-7" onClick={handleVisibility} />
      </div>
    </nav>
  );
};

export default Navbar;
