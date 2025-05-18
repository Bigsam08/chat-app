import { useState } from "react";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSend = () => {
    if (!message.trim() && !image) return;
    onSend({ message, image });
    setMessage("");
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  return (
    <div className="flex items-center p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* Image selector */}
      <label className="cursor-pointer mr-3">
        <PhotoIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </label>

      {/* Text input */}
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        className="ml-3 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition"
        title="Send"
        aria-label="Send message"
      >
        <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
      </button>
    </div>
  );
};

export default ChatInput;
