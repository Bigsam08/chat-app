/**
 *
 * @returns Conversation component
 */

import { useEffect } from "react";
import { messageStore } from "../Store/messageStore";
import ConversationHeader from "./ConversationHeader";
import ChatSkeletonLoader from "../Component/Loaders/ChatSkeletonLoader"

const ConversationPage = () => {
  const { isFetchingChats, getChats, chats, selectedUser } = messageStore();

  // fetch all the user chats
  useEffect(() => {
    getChats(selectedUser._id);
  }, [getChats, selectedUser._id]);

  return (
    <div className="flex flex-1 flex-col overflow-auto p-5 w-full md:w-4/5">
      {/** header div */}
      <header>
        <ConversationHeader />
      </header>
      {/** messages div */}
      {isFetchingChats ? <ChatSkeletonLoader /> : <main>body</main>}

      {/** chat input */}
      <section>input field</section>
    </div>
  );
};

export default ConversationPage;
