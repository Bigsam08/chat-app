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
      className={`rounded-md mt-3 mb-3 text-center w-full bg-purple-600 hover:scale-95 hover:bg-purple-700 text-white md:py-3 py-2 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
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
