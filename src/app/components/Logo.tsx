import React from "react";

interface LogoProps {
  className?: string;
  sizeClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  sizeClassName = "text-2xl md:text-3xl" 
}) => {
  return (
    <span className={`${sizeClassName} font-extrabold tracking-tighter text-white whitespace-nowrap ${className}`}>
      turunc<span className="text-[#ff5625]">.labs</span>
    </span>
  );
};
