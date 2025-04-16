import React from "react";

interface SokeumLogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

const SokeumLogo: React.FC<SokeumLogoProps> = ({ className = "", size = "medium", color = "#D95204" }) => {
  // 사이즈별 텍스트 크기 정의
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-[43px]",
  };

  return (
    <span
      className={`font-raleway font-medium leading-[1.5em] text-center ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "Raleway, sans-serif", color }}
    >
      sokeum
    </span>
  );
};

export default SokeumLogo;
