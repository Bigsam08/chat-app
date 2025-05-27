/**
 * Reuseaable button component
 */

const CustomButton = ({
  type = "button",
  isLoading = false,
  disabled = false,
  text,
  loadingText = "Loading...",
  loadingComponent, // custom loading component
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`rounded-xl text-xs sm:text-sm text-center w-full bg-purple-600 hover:shadow-inner hover:bg-purple-800 text-white py-4 md:py-3  disabled:cursor-not-allowed disabled:bg-gray-300 transition-colors duration-300 ease-linear ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center w-full gap-3">
          {loadingComponent} <span>{loadingText}</span>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
