import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";
import { Users, Star } from "lucide-react";

interface TeacherCardProps {
  id: string;
  name: string;
  subject: string;
  avatar: string; // эмодзи
  description: string;
  students?: number;
  rating?: number;
  online?: boolean; // добавил для полноты
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  id,
  name,
  subject,
  avatar,
  description,
  students,
  rating,
  online
}) => {
  return (
    <Link href={`/chat/${id}`}>
      <motion.div 
        whileHover={{ y: -4 }}
        className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-sm transition-all"
      >
        <div className="flex items-start gap-3">
          <div className="text-4xl">{avatar}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
              {online && (
                <span className="w-2 h-2 bg-green-500 rounded-full" />
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{subject}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">{description}</p>
        
        {(students || rating) && (
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
            {students && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Users size={14} />
                <span>{students}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </Link>
  );
};