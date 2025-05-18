import { useEffect } from "react";
import { messageStore } from "../Store/messageStore";
import SkeletonLoader from "./Loaders/SkeletonLoader";
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
  } = messageStore();

  // on load fetch all users in db
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  // Array to display online users
  const { onlineUsers } = authStore();

  return (
    <aside className="hidden  md:flex p-2  h-[calc(100vh-5rem)] shadow-lg">
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

        {isFetchingUsers ? (
          <SkeletonLoader />
        ) : userFetchError ? (
          <p className="text-dim p-2 text-sm">😔{userFetchError} </p>
        ) : allusers.length === 0 ? (
          <p className="text-dim p-2 text-sm">No users found </p>
        ) : (
          <div className="overflow-y-auto w-full">
            {allusers.map((user, idx) => (
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
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
                {/** online indicator */}
                <div
                  className={`absolute size-3 rounded-full top-3 left-9 ${
                    onlineUsers.includes(user._id)
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
