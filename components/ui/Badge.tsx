import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success" | "error";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "md", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[#F5F5F7] text-[#1D1D1F]",
    outline: "bg-transparent border border-[#D2D2D7] text-[#1D1D1F]",
    success: "bg-[#E8F8ED] text-[#1A7F3C]",
    error: "bg-[#FEE8E7] text-[#C0392B]",
  };

  const sizes = {
    sm: "h-5 px-1.5 text-xs rounded-[10px]",
    md: "h-6 px-2 text-xs rounded-[12px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium whitespace-nowrap ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
