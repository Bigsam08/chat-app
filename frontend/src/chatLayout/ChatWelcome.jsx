import { useState, useEffect } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import FloatingButton from "../Component/FloatingButton";
import SkeletonLoader from "../Component/Loaders/SkeletonLoader";

import { PlusIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { messageStore } from "../Store/messageStore";
import { authStore } from "../Store/authStore";

import { motion as Motion, AnimatePresence } from "framer-motion";

const ChatWelcome = () => {
  const [displayContact, setDisplayContact] = useState(false); // state for mobile menu to display the contact page

  const {
    getAllUsers,
    isFetchingUsers,
    allusers,
    userFetchError,
    selectedUser,
    setSelectedUser,
    searchingUser,
    searchResult,
    searchSpecificUser,
  } = messageStore();

  const [searchedUser, setSearchedUser] = useState(""); // get the user search input
  const { onlineUsers } = authStore();

  // on load fetch all users on load
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  // filtered search handle search logic
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // checks if there is a change in the search state
      // run the api call
      if (searchedUser.trim()) {
        searchSpecificUser(searchedUser.trim());
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchedUser, searchSpecificUser]);

  /**
   * creates a variable that stores dynamically either the search
   * results or the full contact
   * if the search field inout excluding spaces is empty ? show all users
   * else if search field has input  show result of search
   */
  const shuffleArray = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const baseUsers = searchedUser.trim().length > 0 ? searchResult : allusers;

  const onlineUsersList = baseUsers.filter((user) =>
    onlineUsers.includes(user.userName)
  );
  const offlineUsersList = baseUsers.filter(
    (user) => !onlineUsers.includes(user.userName)
  );

  // Shuffle offline users only
  const shuffledOfflineUsers = shuffleArray(offlineUsersList);

  // Combine online users (stay on top) + shuffled offline users
  const displayUsers = [...onlineUsersList, ...shuffledOfflineUsers];


  const handleToggle = () => {
    setDisplayContact(!displayContact);
  };
  return (
    <div className="relative h-screen flex flex-1 justify-center items-center">
      <div className="text-center space-y-5 px-3 max-w-md mx-auto">
        <ChatBubbleLeftRightIcon
          className="h-32 w-32  mx-auto animate-bounce"
          aria-hidden="true"
        />
        <h1 className="font-bold text-xl logo-font">Welcome to Q Chat</h1>
        <p className="text-dim">
          Your conversation starts here — select a contact and start chatting.
        </p>
      </div>

      {/** Mobile floating contact icon */}
      <div className="md:hidden fixed bottom-14 right-4 ">
        <FloatingButton
          icon={<PlusIcon className="w-8 h-8" />}
          text="Start new chat"
          title="Start new Chat"
          onClick={handleToggle}
        />
      </div>
      {/**----------------------- display contact page on mobile screens---------------- */}

      {displayContact && (
        <AnimatePresence mode="wait">
          <Motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute overflow-y-auto md:hidden h-screen w-full bg-white/5 backdrop-blur-md"
          >
            {/** close icon */}
            <div className="flex justify-end pr-5 py-2">
              <button onClick={() => setDisplayContact(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
            </div>

            {/**  search bar */}
            <div className="relative p-2 mt-3">
              <input
                type="search"
                value={searchedUser}
                onChange={(e) => setSearchedUser(e.target.value)}
                placeholder="Search users..."
                className="w-full px-3 py-2 pl-10 bg-transparent rounded focus:border-b hover:border-b border-opacity-60 focus:outline-none"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117.5 10a7.5 7.5 0 01-7.5 7.5z"
                />
              </svg>
            </div>
            {isFetchingUsers || searchingUser ? (
              <SkeletonLoader />
            ) : userFetchError ? (
              <p className="text-dim p-2 text-sm">
                😔 Error has occurred, refresh{" "}
              </p>
            ) : displayUsers.length === 0 ? (
              <p className="text-dim p-2 text-sm">No users found </p>
            ) : (
              <div className="overflow-y-auto w-full">
                {displayUsers.map((user, idx) => (
                  <button
                    onClick={() => setSelectedUser(user)}
                    key={user._id || idx}
                    className={`relative flex gap-4 items-center w-full p-2 mb-3 mt-3 hover:bg-gray-700 transition-colors ${
                      selectedUser?._id === user._id
                        ? "text-green-500 rounded-sm"
                        : ""
                    }`}
                  >
                    <img
                      src={user?.profilePic || "/profile-avatar.png"}
                      alt="user profile pic"
                      className="relative rounded-full object-cover size-9 "
                    />
                    {/** name and online status */}
                    <div>
                      <p className="text-sm truncate font-bold">
                        {user.userName || "Unknown"}
                      </p>
                      <p className="text-sm font-thin text-dim">
                        {onlineUsers?.includes(user.userName)
                          ? "Online"
                          : "Offline"}
                      </p>
                    </div>
                    {/** online indicator */}
                    <div
                      className={`absolute size-3 rounded-full top-3 left-9 ${
                        onlineUsers?.includes(user.userName)
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </button>
                ))}
              </div>
            )}
          </Motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ChatWelcome;
