const ChatSkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="px-4 py-6 space-y-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => {
        const isSender = i % 2 === 0;
        const isImage = i % 3 === 0; // every 3rd message is an image

        return (
          <div
            key={i}
            className={`flex items-end gap-2 ${
              isSender ? "justify-start" : "justify-end"
            }`}
          >
            {/* Avatar */}
            {isSender && <div className="size-8 bg-gray-600 rounded-full" />}

            {/* Message bubble */}
            <div
              className={`rounded-xl ${
                isSender ? "bg-gray-700" : "bg-purple-700"
              } p-2 max-w-xs w-full sm:w-1/3`}
            >
              {isImage ? (
                <div className="w-full h-32 bg-gray-500 rounded-md" />
              ) : (
                <div className="space-y-2">
                  <div className="h-3 w-3/4 bg-gray-500 rounded" />
                  <div className="h-3 w-1/2 bg-gray-600 rounded" />
                </div>
              )}
            </div>

            {/* Avatar for self (right side) */}
            {!isSender && <div className="size-8 bg-gray-600 rounded-full" />}
          </div>
        );
      })}
    </div>
  );
};

export default ChatSkeletonLoader;
