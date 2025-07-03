// FormField.jsx
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const FormField = ({
  label,
  type = "text",
  name,
  icon,
  value,
  onChange,
  placeholder,
  labelColor = "text-gray-800",
  readOnly = false,
  autoComplete = "on",
}) => {
  const inputId = `input-${name}`; // dynamically get the html if from input name
  const [showPassword, setShowPassword] = useState(); // toggle password visibility
  // function to handle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control w-full">
      <label htmlFor={inputId} className="label">
        <span
          className={`label-text text-xs sm:text-base font-medium ${labelColor}`}
        >
          {label}
        </span>
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-200 z-10">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          type={showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input input-bordered rounded-xl w-full focus:outline-none text-xs sm:text-sm ${
            readOnly ? "bg-gray-700 text-gray-400 italic" : "bg-gray-900"
          } ${
            icon ? "pl-10" : "pl-4"
          } relative z-0 transition-all duration-200`}
          autoComplete={autoComplete}
          readOnly={readOnly}
        />
        {type === "password" && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text gray-500 z-10"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
