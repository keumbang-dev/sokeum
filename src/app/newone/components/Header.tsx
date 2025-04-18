import SokeumLogo from "@/components/ui/SokeumLogo";
import React from "react";

// Placeholder for Header Component (Adapt or Create New)
export const Header = () => {
  // Simplified Header for this example - Adapt navigation if needed
  return (
    <header className="sticky top-0 z-50 w-full bg-[#110703]/90 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between h-10 sm:h-15 px-10">
        {/* Placeholder Logo */}
        <SokeumLogo size="xsmall" />
        <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm transition-colors">
          시작하기
        </button>
      </div>
    </header>
  );
};
