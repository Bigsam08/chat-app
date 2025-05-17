/**
 * Main chat Entry
 */

import Sidebar from "../Component/Sidebar";
import Navbar from "../Component/Navbar";
import ChatWelcome from "../Component/ChatWelcome"; // default component for new user
import ConversationPage from "../Component/ConversationPage"

import { PlusIcon } from "@heroicons/react/24/solid";
import FloatingButton from "../Component/FloatingButton";

import { messageStore } from "../Store/messageStore";

const ChatPage = () => {
  const { selectedUser } = messageStore();
  return (
    <main className="relative flex flex-col min-h-screen bg-gray-900">
      <Navbar />
      {/** Main body screen */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          {/*** A dynamic component rendering
           * if user selects a chat display the conversation page dynamically showing end to end messages else show the default homepage
           */}
          {!selectedUser ? <ChatWelcome /> : <ConversationPage />}
        </div>
      </div>

      {/** Mobile floating contact icon */}
      <div className="md:hidden fixed bottom-14 right-4">
        <FloatingButton
          icon={<PlusIcon className="w-8 h-8" />}
          text="Start new chat"
          title="Start new Chat"
        />
      </div>
    </main>
  );
};

export default ChatPage;
