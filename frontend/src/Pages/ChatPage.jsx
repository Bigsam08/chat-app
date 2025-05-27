/**
 * Main chat Entry
 */

import Sidebar from "../chatLayout/Sidebar";
import MyRightSideProfile from "../chatLayout/MyRightSideProfie";
import Navbar from "../Component/Navbar";
import ChatWelcome from "../chatLayout/ChatWelcome"; // default component for new user
import ConversationPage from "../chatLayout/ConversationPage";
import UserRightSideProfile from "../chatLayout/userRightSideProfile";

import { messageStore } from "../Store/messageStore";

const ChatPage = () => {
  const { selectedUser } = messageStore();
  return (
    <main className="relative flex flex-col h-screen ">
      <Navbar />
      {/** Main body screen */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-1 lg:flex-[2] shadow-lg overflow-hidden">
          {/*** A dynamic component rendering
           * if user selects a chat display the conversation page dynamically showing end to end messages else show the default homepage
           */}
          {!selectedUser ? <ChatWelcome /> : <ConversationPage />}
        </div>

        {/** ----------- right side section to display user  or selceted user deatils dynamically */}
        <section className="hidden lg:flex flex-[1] overflow-hidden h-[calc(100vh-6rem)] mt-2 rounded-xl">
          {!selectedUser ? <MyRightSideProfile /> : <UserRightSideProfile />}
        </section>
      </div>
    </main>
  );
};

export default ChatPage;
