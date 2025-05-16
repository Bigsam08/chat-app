import { CameraIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { authStore } from "../Store/authStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import FormField from "../Component/FormField"; // input field 
import Spinner from "../Component/Spinner"; // button loader

import { format } from 'date-fns';  // format user account creation date 

const Setting = () => {
  const {
    userAuth,
    isUpdatingProfilePic,
    updateProfilePic,
    isUpdatingStatus,
    updateProfileStatus,
    isDeleting,
    deleteUser,
  } = authStore();
  const [status, setStatus] = useState(userAuth?.status || ""); // get user updated status
  const [image, setImage] = useState(null); // get user selected image

  // format the date
  const createdDate = userAuth?.createdAt ? new Date(userAuth.createdAt) : null;


  // handle profile pic change and upload
  const handleProfilePic = (e) => {
    const file = e.target.files[0]; // get the user selected file
    if (!file) {
      return; // if user selects no file this function do nothing
    }
    const reader = new FileReader(); // to read the file in url base64 format
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const imagebase64 = reader.result;
      setImage(imagebase64);
      await updateProfilePic({ profilePic: imagebase64 }); // from user auth send file to backend
    };
  };

  // handle status update
  const handleStatus = () => {
    updateProfileStatus(status);
  };

  useEffect(() => {
  setStatus(userAuth?.status || "");
}, [userAuth?.status]);

  // delete user account
  const handleDelete = () => {
    deleteUser();
  };

  return (
    <div className="h-screen bg-custom p-4 md:p-10">
      {/* Middle container */}
      <div className="max-w-2xl mx-auto bg-gray-900 p-5 text-white rounded-md  md:p-10 h-full md:h-auto overflow-y-auto md:overflow-visible">
        <div className="flex gap-3 items-center mb-4">
          <Link to="/chat">
            {" "}
            <ArrowLeftIcon className="h-6 w-6 hover:scale-90" />
          </Link>
          <h2 className="text-md md:text-xl font-semibold">Profile Settings</h2>
        </div>

        {/* Picture container */}
        <section className="flex flex-col justify-center items-center mt-6 gap-2">
          <div className="relative h-28 w-28 md:w-48 md:h-48">
            <label
              htmlFor="profile-pic-input"
              className="cursor-pointer"
              title="Upload profile picture"
            >
              <img
                src={image || userAuth?.profilePic || "/profile-avatar.jpg"}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-white"
              />
              <CameraIcon className="absolute bottom-2 right-0 md:bottom-3 md:right-2 h-8 w-8 text-white bg-gray-700 p-1 rounded-full shadow" />
              <input
                id="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePic}
              />
            </label>
          </div>
          <p className="text-sm text-gray-400">
            {isUpdatingProfilePic ? "Uploading..." : "Change profile picture"}
          </p>
        </section>
        {/** body container */}
        <hr className="mt-5 border-gray-800" />
        {/** status */}
        <section className="mt-3">
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            status
          </label>
          <textarea
            id="status"
            rows={2}
            placeholder="What is on your mind ..."
            maxLength={100}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="w-full px-4 py-2 bg-gray-800 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <div className="flex justify-end mt-2 px-1">
            <button
              onClick={handleStatus}
              disabled={isUpdatingStatus}
              className="bg-green-500 p-2 text-sm hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isUpdatingStatus ? (
                <div className="flex justify-center items-center gap-2">
                  <Spinner />
                  <p> updating ...</p>
                </div>
              ) : (
                "save"
              )}
            </button>
          </div>
        </section>

        {/** user details*/}
        <div className="mt-4 p-3 border border-gray-800">
          <p className="text-sm mb-2"> User details:</p>
          <FormField
            label="user name"
            labelColor="text-gray-400"
            readOnly={true}
            placeholder={userAuth?.userName || "guest"}
          />
          <FormField
            label="email"
            readOnly={true}
            labelColor="text-gray-400"
            placeholder={userAuth?.email || "johndoe@gmail.com"}
          />
        </div>
        {/** Account information */}
        <section className="mt-6">
          <div className="flex justify-between text-sm px-2">
            <p>Member since: </p>
            <p> {createdDate ? format(createdDate, 'MMM yyyy') : 'N/A'}</p>
          </div>
          <div className="flex justify-between text-sm px-2 mt-3">
            <p>Account status: </p>
            <p> Verified ✅</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className=" text-sm mt-8 text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isDeleting ? (
              <div className="flex justify-center items-center gap-2">
                <Spinner /> <p> Deleting Account</p>{" "}
              </div>
            ) : (
              "Delete My Account"
            )}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Setting;
