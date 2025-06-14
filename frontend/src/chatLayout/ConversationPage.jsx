/**
 *
 * @returns Conversation component
 */

import { useRef, useEffect } from "react";
import { messageStore } from "../Store/messageStore";
import ConversationHeader from "../Component/ConversationHeader";
import ChatSkeletonLoader from "../Component/Loaders/ChatSkeletonLoader";
import ChatInput from "../Component/ChatInput";
import { authStore } from "../Store/authStore";
import { format } from "date-fns";

const ConversationPage = () => {
  // add chats from the msg store
  const {
    isFetchingChats,
    getChats,
    chats,
    selectedUser,
    getLiveMessage,
    offlineMessages,
  } = messageStore();
  const { userAuth } = authStore(); // get my id

  const bottomRef = useRef(null);

  //if conversation is selected activate live message
  useEffect(() => {
    if (selectedUser) {
      getLiveMessage();
    }
    return () => {
      offlineMessages();
    };
  }, [getLiveMessage, selectedUser, offlineMessages]);

  // fetch all the user chats
  useEffect(() => {
    getChats(selectedUser._id);
  }, [getChats, selectedUser._id]);

  // Scroll to bottom when chats change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-1 flex-col justify-between rounded-xl mt-2 min-h-0 backdrop-blur-sm">
      {/** header div */}
      <header>
        <ConversationHeader />
      </header>
      {/** messages div */}
      <main className="flex flex-col flex-1 min-h-0 overflow-y-auto space-y-2 p-2 hide-scrollbar bg-chat">
        {isFetchingChats ? (
          <ChatSkeletonLoader />
        ) : chats.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-sm">
              This is the beginning of <br />
              your conversation
            </p>
          </div>
        ) : (
          chats.map((message) => {
            const myMessage = message.senderId._id === userAuth.id;
            return (
              <div
                key={message._id}
                className={`chat ${myMessage ? "chat-end" : "chat-start"} p-2 `}
              >
                {/** chat image avatar  */}
                <div className="chat-image avatar">
                  <div className="size-10  rounded-full border border-gray-300">
                    <img
                      src={
                        myMessage
                          ? userAuth.profilePic || "/profile-avatar.png"
                          : selectedUser.profilePic || "/profile-avatar.png"
                      }
                      alt="display avatar"
                    />
                  </div>
                </div>

                {/** chat header */}
                <div className="chat-header mb-1">
                  <time className="opacity-50 ml-1 text-xs">
                    {message.createdAt
                      ? format(new Date(message.createdAt), "p")
                      : ""}
                  </time>
                </div>

                {/** chat bubble */}
                <div
                  className={`chat-bubble flex flex-col text-xs md:text-sm ${
                    myMessage
                      ? "chat-bubble-bg rounded-xl"
                      : " bg-gray-400 rounded-xl"
                  }`}
                >
                  {message.images && (
                    <img
                      src={message.images}
                      alt="chat image attachment"
                      className="rounded-md mb-2 sm:max-w-[200px]"
                    />
                  )}
                  {message.text && <p>{message.text} </p>}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </main>

      {/** chat input */}
      <section className="">
        <ChatInput />
      </section>
    </div>
  );
};

export default ConversationPage;
