import { useEffect, useState } from "react";
import { messageStore } from "../Store/messageStore";
import SkeletonLoader from "../Component/Loaders/SkeletonLoader";
import { authStore } from "../Store/authStore";
import { UsersIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
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

  // Array to display online users
  const { onlineUsers } = authStore();
  const [searchedUser, setSearchedUser] = useState(""); // get the user search input

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

  // const displayUsers = searchedUser.trim().length > 0 ? searchResult : allusers;

  return (
    <aside className="hidden md:flex pt-2 h-[calc(100vh-6rem)] shadow-lg rounded-xl m-2 bg-left-side">
      {/** right contact list */}
      <div className="pl-3">
        <div className="flex items-center gap-2 pt-3 mb-5">
          <UsersIcon className="size-7" />
          <h3 className="font-bold text-lg">Contacts</h3>
        </div>
        {/**  search bar */}
        <div className="relative p-2">
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
            {displayUsers.map((user, idx) => {
              const isUserOnline =
                user?.userName && onlineUsers?.includes(user.userName);

              return (
                <button
                  onClick={() => setSelectedUser(user)}
                  key={user._id || idx}
                  className={`relative flex gap-4 items-center w-full p-2 mb-4 mt-3 shadow-lg hover:scale-95 rounded-xl transition-colors ease-in-out duration-300
                   ${selectedUser?._id === user._id ? "hover-left" : ""}`}
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
                      {isUserOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                  {/** online indicator */}
                  <div
                    className={`absolute size-3 rounded-full bottom-3 left-9 ${
                      isUserOnline ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
