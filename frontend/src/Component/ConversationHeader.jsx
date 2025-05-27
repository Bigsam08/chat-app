/**
 * Header for the conversation chat page
 */
import { XMarkIcon } from "@heroicons/react/24/solid";
import { authStore } from "../Store/authStore";

import { messageStore } from "../Store/messageStore";

const ConversationHeader = () => {
  const { selectedUser, setSelectedUser } = messageStore();
  // Array to display online users
  const { onlineUsers } = authStore();

  return (
    <div className="p-2.5  shadow-lg bg-chat border-b border-gray-700">
      <div className="flex items-center justify-between">
        {/** user image or dp */}
        <div className="flex items-center gap-3">
          <div className="relative avatar rounded-full size-10">
            <img
              src={selectedUser?.profilePic || "/profile-avatar.png"}
              alt="user profile pic"
              className="rounded-full"
            />
             <div
              className={`absolute size-3 rounded-full bottom-0 left-7 ${
                onlineUsers.includes(selectedUser._id)
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.userName}</h3>
            <p className="text-sm text-dim">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
           
          </div>
        </div>
        {/** close chat */}
        <div>
          <button onClick={() => setSelectedUser()} title="close chat">
            <XMarkIcon className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
