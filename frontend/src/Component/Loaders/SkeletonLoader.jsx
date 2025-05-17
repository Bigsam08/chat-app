
const SkeletonLoader = ({ count = 6 }) => {
 
  return (
    <div className="space-y-4 mt-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex gap-3 items-center w-full p-2 animate-pulse"
        >
          {/* Circle skeleton for avatar */}
          <div className="bg-gray-600 rounded-full size-9" />

          {/* Name and status skeletons */}
          <div className="flex flex-col space-y-2">
            <div className="h-3 w-32 bg-gray-600 rounded" />
            <div className="h-2 w-20 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
