import React from "react";
import { Input } from "./Input";
import { Search } from "lucide-react";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  size?: "md" | "lg";
}

export const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Поиск...",
  value,
  onChange,
  className = "",
  size = "md"
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size={size}
        className="pl-10"
      />
    </div>
  );
};