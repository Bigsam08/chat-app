/**
 *
 * @returns Conversation component
 */

import { useRef, useEffect } from "react";
import { messageStore } from "../Store/messageStore";
import ConversationHeader from "./ConversationHeader";
import ChatSkeletonLoader from "../Component/Loaders/ChatSkeletonLoader";
import ChatInput from "../Component/ChatInput";
import { authStore } from "../Store/authStore";
import { format } from "date-fns";

const ConversationPage = () => {
  // add chats from the msg store
  const { isFetchingChats, getChats, chats, selectedUser } = messageStore();
  const { userAuth } = authStore(); // get my id

  const bottomRef = useRef(null);

  // fetch all the user chats
  useEffect(() => {
    getChats(selectedUser._id);
  }, [getChats, selectedUser._id]);

  // Scroll to bottom when chats change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-1 flex-col justify-between min-h-0 p-5 w-full md:w-4/5 bg-white/10 backdrop-blur-sm">
      {/** header div */}
      <header>
        <ConversationHeader />
      </header>
      {/** messages div */}
      <main className="flex flex-col flex-1 min-h-0 overflow-y-auto space-y-2 p-2 hide-scrollbar">
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
            const myMessage = message.senderId._id === (userAuth.id);
            return (
              <div
                key={message._id}
                className={`chat ${
                  myMessage ? "chat-end" : "chat-start"
                } p-2 border-gray-800 border`}
              >
                {/** chat image avatr  */}
                <div className="chat-image avatar">
                  <div className="size-10 border rounded-full">
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
                <div className={`chat-bubble flex flex-col text-sm ${myMessage ? "bg-green-600" : ""}`}>
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
      <section>
        <ChatInput />
      </section>
    </div>
  );
};

export default ConversationPage;
