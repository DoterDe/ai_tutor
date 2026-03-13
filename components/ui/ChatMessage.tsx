import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "./Avatar";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: React.ReactNode;
  timestamp?: string;
  avatar?: string; // emoji для ассистента
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  role, 
  content, 
  timestamp,
  avatar 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {role === 'assistant' && (
        <Avatar 
          size="sm" 
          className="mr-2 bg-gray-100"
          emoji={avatar || '🤖'}
        />
      )}
      <div className={`max-w-[70%] p-3 rounded-xl text-sm ${
        role === 'user' 
          ? 'bg-black text-white rounded-br-none' 
          : 'bg-gray-100 rounded-bl-none'
      }`}>
        {content}
        {timestamp && (
          <div className="text-xs text-gray-400 mt-1">{timestamp}</div>
        )}
      </div>
    </motion.div>
  );
};