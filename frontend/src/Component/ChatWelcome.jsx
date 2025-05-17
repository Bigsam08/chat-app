import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const ChatWelcome = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full md:w-4/5">
      <div className="text-center space-y-5 px-3 max-w-md mx-auto">
        <ChatBubbleLeftRightIcon
          className="h-32 w-32  mx-auto text-gray-400 animate-bounce"
          aria-hidden="true"
        />
        <h1 className="font-bold text-xl text-purple-300">Welcome to Q Chat</h1>
        <p className="text-gray-500">
          Your conversation starts here — select a contact and start chatting.
        </p>
      </div>
    </div>
  );
};

export default ChatWelcome;
