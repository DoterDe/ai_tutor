import React from "react";

interface InputProps {
  size?: "md" | "lg";
  state?: "default" | "focus" | "error" | "success";
  label?: string;
  error?: string;
  success?: string;
  fullWidth?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
}

export const Input: React.FC<InputProps> = ({
  size = "md",
  state = "default",
  label,
  error,
  success,
  fullWidth = false,
  className = "",
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  name,
  id,
}) => {
  const sizeClasses = {
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const stateClasses = {
    default: "border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400",
    focus: "border-gray-400 ring-1 ring-gray-400",
    error: "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500",
    success: "border-green-500 focus:border-green-500 focus:ring-1 focus:ring-green-500"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          rounded-lg border bg-white 
          focus:outline-none transition-colors
          ${sizeClasses[size]}
          ${stateClasses[state]}
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
          ${widthClass}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {success && (
        <p className="mt-1 text-sm text-green-500">{success}</p>
      )}
    </div>
  );
};