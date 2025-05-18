/**
 *
 * @returns Conversation component
 */

import { useEffect } from "react";
import { messageStore } from "../Store/messageStore";
import ConversationHeader from "./ConversationHeader";
import ChatSkeletonLoader from "../Component/Loaders/ChatSkeletonLoader";
import ChatInput from "../Component/ChatInput";

const ConversationPage = () => {
  // add chats from the msg store
  const { isFetchingChats, getChats, selectedUser } = messageStore();

  // fetch all the user chats
  useEffect(() => {
    getChats(selectedUser._id);
  }, [getChats, selectedUser._id]);

  return (
    <div className="flex flex-1 flex-col justify-between min-h-[calc(100vh-7rem)] overflow-auto p-5 w-full md:w-4/5 bg-white/10 backdrop-blur-sm">
      {/** header div */}
      <header>
        <ConversationHeader />
      </header>
      {/** messages div */}
      {isFetchingChats ? <ChatSkeletonLoader /> : <main>body</main>}

      {/** chat input */}
      <section>
        <ChatInput />
      </section>
    </div>
  );
};

export default ConversationPage;
