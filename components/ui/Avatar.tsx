import React from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
  online?: boolean;
  className?: string;
  emoji?: string; // добавляем пропс для emoji
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  online = false,
  className = "",
  emoji,
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  };

  // Получаем первую букву имени для инициалов
  const initials = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className="relative inline-block">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${sizeClasses[size]} ${className}`}
      >
        {src ? (
          <img src={src} alt="avatar" className="w-full h-full object-cover" />
        ) : emoji ? (
          <span className="text-lg">{emoji}</span>
        ) : (
          <span className="font-medium">{initials || '👤'}</span>
        )}
      </motion.div>
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
};