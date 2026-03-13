import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = "left",
  type = "button",
  onClick,
  ...props // остальные пропсы (они не будут конфликтовать)
}) => {
  const base = "font-medium transition-all rounded-md inline-flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 active:bg-gray-900",
    secondary: "border border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const widthClass = fullWidth ? "w-full" : "";

  // Определяем порядок иконки и текста
  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabledClass} ${widthClass} ${className}`}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Загрузка...</span>
        </div>
      ) : (
        content
      )}
    </motion.button>
  );
};
