import { useState, useEffect, useMemo } from "react";

import FloatingButton from "../Component/FloatingButton";
import SkeletonLoader from "../Component/Loaders/SkeletonLoader";
import { messageStore } from "../Store/messageStore";
import { authStore } from "../Store/authStore";
import { motion as Motion, AnimatePresence } from "framer-motion";

import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const ChatWelcome = () => {
  const [viewMode, setViewMode] = useState("recent"); // 'recent' | 'contacts'
  const [searchedUser, setSearchedUser] = useState("");

  const {
    isFetchingUsers,
    allusers,
    userFetchError,
    selectedUser,
    setSelectedUser,
    searchingUser,
    searchResult,
    searchSpecificUser,
    recentChats,
    markMessageAsRead,
    updateReadMessages,
    unreadCount,
  } = messageStore();

  const { onlineUsers } = authStore();

  // fetch all necessary details on mount
  useEffect(() => {
    messageStore.getState().getAllUsers();
    messageStore.getState().fetchRecentChats();
    messageStore.getState().fetchUnReadCount();
  }, []);

  // connect web socket for live updates and real time notification counts
  useEffect(() => {
    messageStore.getState().getLiveMessage();
    return () => messageStore.getState().offlineMessages();
  }, []);

  // clean up notification count and mark as read when msg isOpened
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    markMessageAsRead(user._id);
    updateReadMessages(user._id);
  };

  /**  search box to find a user in contact list */
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchedUser.trim()) {
        searchSpecificUser(searchedUser.trim());
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchedUser, searchSpecificUser]);

  /** shuffle what contact list to display
   * set online users first and offline users below
   * or display a searched contact
   */

  const shuffleArray = (array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const displayUsers = useMemo(() => {
    const baseUsers = searchedUser.trim() ? searchResult : allusers;
    const online = baseUsers.filter((user) =>
      onlineUsers.includes(user.userName)
    );
    const offline = shuffleArray(
      baseUsers.filter((user) => !onlineUsers.includes(user.userName))
    );
    return [...online, ...offline];
  }, [searchedUser, searchResult, allusers, onlineUsers]);

  return (
    <div className="relative h-screen w-full flex justify-center items-center shadow-lg">
      <div className="text-center space-y-2 px-3 max-w-md mx-auto">
        <ChatBubbleLeftRightIcon className="size-14 md:size-28 mx-auto animate-bounce" />
        <h1 className="text-lg sm:text-2xl logo-font">Welcome to Q Chat</h1>
        <p className="text-xs sm:text-lg text-dim px-12 md:px-0">
          Your conversation starts here — select a contact and start chatting.
        </p>
      </div>

      {/** Floating action button for mobile */}
      <div className="md:hidden fixed bottom-14 right-4">
        <FloatingButton
          icon={<PlusIcon className="w-8 h-8" />}
          text="Start new chat"
          title="Start new Chat"
          onClick={() => setViewMode("contacts")}
        />
      </div>

      {/** Contacts page on mobile */}
      {viewMode === "contacts" && (
        <AnimatePresence mode="wait">
          <Motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.5 }}
            className="absolute overflow-y-auto md:hidden h-screen w-full bg-white/5 backdrop-blur-md"
          >
            <div className="flex justify-end pr-5 py-2">
              <button onClick={() => setViewMode("recent")}>
                <XMarkIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
              </button>
            </div>

            <div className="relative p-2 mt-3">
              <label htmlFor="searchUser" className="sr-only">
                Search users
              </label>
              <input
                id="searchUser"
                type="search"
                value={searchedUser}
                onChange={(e) => setSearchedUser(e.target.value)}
                placeholder="Search users..."
                className="w-full px-3 py-2 pl-10 bg-transparent rounded focus:border-b hover:border-b border-opacity-60 focus:outline-none"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4"
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
                😔 Error has occurred, refresh
              </p>
            ) : displayUsers.length === 0 ? (
              <p className="text-dim p-2 text-sm">No users found</p>
            ) : (
              <div className="overflow-y-auto w-full">
                {displayUsers.map((user) => (
                  <button
                    onClick={() => handleUserSelect(user)}
                    key={user._id}
                    className={`relative flex gap-4 items-center w-full p-2 mb-3 mt-3 hover:bg-gray-700 transition-colors ${
                      selectedUser?._id === user._id
                        ? "text-green-500 rounded-sm"
                        : ""
                    }`}
                  >
                    <img
                      src={user?.profilePic || "/profile-avatar.png"}
                      alt="profile"
                      className="rounded-full object-cover size-9"
                    />
                    <div>
                      <p className="text-sm truncate font-bold">
                        {user?.userName || "Unknown"}
                      </p>
                      <p className="text-sm font-thin text-dim">
                        {onlineUsers?.includes(user?.userName)
                          ? "Online"
                          : "Offline"}
                      </p>
                    </div>
                    <div
                      className={`absolute size-3 rounded-full top-3 left-9 ${
                        onlineUsers?.includes(user?.userName)
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </Motion.div>
        </AnimatePresence>
      )}

      {/** ---------------------Recent chats page --------------------- */}
      {viewMode === "recent" && (
        <div className="md:hidden absolute bottom-0 left-0 right-0 top-0 overflow-y-auto px-4 py-5 bg-chat">
          {recentChats.length === 0 ? (
            <div className="flex justify-normal items-center h-[calc(100vh-40px)]">
              <div className="text-center space-y-2 px-3 max-w-md mx-auto">
                <ChatBubbleLeftRightIcon className="size-14 md:size-28 mx-auto animate-bounce" />
                <h1 className="text-lg sm:text-2xl logo-font">
                  Welcome to Q Chat
                </h1>
                <p className="text-xs text-dim px-12 md:px-0">
                  Your conversation starts here — select a contact and start
                  chatting.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <button
                  onClick={() =>
                    handleUserSelect({
                      _id: chat.userId,
                      userName: chat.userName,
                      profilePic: chat.profilePic,
                    })
                  }
                  key={chat.userId}
                  className={`relative flex items-center gap-4 w-full p-2 rounded-md transition-all shadow hover:scale-95 border border-dim ${
                    selectedUser?._id === chat.userId ? "bg-gray-700" : ""
                  }`}
                >
                  <img
                    src={chat?.profilePic || "/profile-avatar.png"}
                    alt="dp"
                    className="size-9 border border-dim rounded-full object-cover"
                  />
                  <div className="flex flex-col text-left flex-1 space-y-1">
                    <p className="text-sm font-semibold truncate">
                      {chat?.userName}
                    </p>
                    <p className="text-xs text-dim truncate">
                      {chat?.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(chat.lastMessageAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {/** --------------- notification bell----------------- */}
                  {/** unread messages count */}

                  {unreadCount &&
                    unreadCount.length > 0 &&
                    (() => {
                      const eachCount = unreadCount.find(
                        (contact) => contact._id === chat._id
                      );
                      if (eachCount?.count > 0) {
                        return (
                          <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                            {eachCount.count}
                          </span>
                        );
                      }
                      return null;
                    })()}

                  {/** ------------ online icon----------- */}
                  <div
                    className={`absolute bottom-3 left-9 h-3 w-3 rounded-full ${
                      onlineUsers.includes(chat?.userName)
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </button>
              ))}
            </div>
          )}

          {/**--------------- Floating action button for recent chats --------------------- */}
          <div className="md:hidden fixed bottom-14 right-4">
            <FloatingButton
              icon={<PlusIcon className="w-8 h-8" />}
              text="Start new chat"
              title="Start new Chat"
              onClick={() => setViewMode("contacts")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWelcome;
