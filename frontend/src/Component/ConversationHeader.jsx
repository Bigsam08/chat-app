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
    <div className="border-b p-2.5 border-gray-800">
      <div className="flex items-center justify-between">
        {/** user image or dp */}
        <div className="flex items-center gap-3">
          <div className="avatar rounded-full size-10">
            <img
              src={selectedUser?.profilePic || "/profile-avatar.png"}
              alt="user profile pic"
              className="rounded-full"
            />
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.userName}</h3>
            <p className="text-sm">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}{" "}
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
