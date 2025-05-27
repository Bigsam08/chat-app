import { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { PaperAirplaneIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { messageStore } from "../Store/messageStore";
import toast from "react-hot-toast";

const ChatInput = () => {
  const { sendMessage, isSendingMessage } = messageStore();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);
  const fileInputRef = useRef(null);
  /**
   * if all error checks out clear
   * use try catch to send the message and clear states
   * image state, preview state and message state
   */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !image) return;
    try {
      await sendMessage({
        text: message.trim(),
        images: image,
      });
      // clear states
      setMessage("");
      if (imagePrev) URL.revokeObjectURL(imagePrev);
      setImage(null);
      setImagePrev(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; //  reset input
      }
    } catch (error) {
      console.log("failed to send message from input page", error.message);
    }
  };
  /**
   * checks for nul and if image is file or not
   * handles the image catch
   * set the image and also the preview
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    // File size check (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error("Image must be less than 10MB");
      return;
    }

    //convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const imagebase64 = reader.result;
      setImage(imagebase64); // image converted to base64
    };
    reader.readAsDataURL(file);

    // Set preview
    const objectURL = URL.createObjectURL(file);
    setImagePrev(objectURL);
  };

  /**
   * function to remove preview image if user  changes mind
   * reset image and preview state back to empty
   */
  const handleImageRemove = () => {
    if (imagePrev) URL.revokeObjectURL(imagePrev);
    setImage(null);
    setImagePrev(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex items-center p-3 input-bg shadow-lg rounded-xl">
      {/* Image Preview  at the top */}
      {imagePrev && (
        <div className="absolute bottom-full mb-3 flex gap-2 items-center left-0 w-full px-3">
          <div className="relative">
            <img
              src={imagePrev}
              alt="Image Preview"
              className={`size-12 object-cover rounded-md border ${
                isSendingMessage ? "animate-pulse" : ""
              }`}
            />

            <button
              onClick={handleImageRemove}
              className="absolute -top-1 -right-2"
            >
              <XMarkIcon className="size-3 bg-gray-700 rounded text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger File Input via Icon */}
      <button
        onClick={triggerFileInput}
        className="cursor-pointer mr-3"
        title="Upload Image"
      >
        <PhotoIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Image Input */}
      <label className="cursor-pointer mr-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          aria-label="Select an image"
          ref={fileInputRef}
        />
      </label>

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="flex flex-1 items-center justify-between"
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isSendingMessage}
          className={`flex-1 px-4 py-2 rounded-md border ${
            isSendingMessage
              ? "bg-gray-100 cursor-not-allowed"
              : "border-gray-300 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          } dark:text-white`}
        />
        {/* Send Button */}
        <button
          type="submit"
          disabled={(!message.trim() && !image) || isSendingMessage}
          className={`ml-3 p-2 rounded-full transition ${
            isSendingMessage
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          } `}
          title={isSendingMessage ? "Sending…" : "Send"}
        >
          {isSendingMessage ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          ) : (
            <PaperAirplaneIcon className="w-5 h-5 rotate-45 text-white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
