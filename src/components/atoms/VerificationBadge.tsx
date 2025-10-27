import React from "react";

interface VerificationBadgeProps {
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  className = "" 
}) => {
  return (
    <span className={`inline-flex items-center justify-center ml-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs font-bold ${className}`}>
      {"✓"}
    </span>
  );
};