import SokeumLogo from "@/components/ui/SokeumLogo";
import React from "react";

// Placeholder for Header Component (Adapt or Create New)
export const Header = () => {
  // Simplified Header for this example - Adapt navigation if needed
  return (
    <header className="sticky top-0 z-50 w-full bg-[#110703]/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-15 px-4">
        {/* Placeholder Logo */}
        <SokeumLogo size="small" />
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#section-benefits" className="text-white hover:text-amber-400 transition-colors">
            소금이란?
          </a>
          <a href="#section-how-it-works" className="text-white hover:text-amber-400 transition-colors">
            이용방법
          </a>
          <a href="#section-simulator" className="text-white hover:text-amber-400 transition-colors">
            리워드 계산
          </a>
          <a href="#section-faq" className="text-white hover:text-amber-400 transition-colors">
            FAQ
          </a>
        </nav>
        <button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 px-4 rounded-md text-sm transition-colors">
          시작하기
        </button>
      </div>
    </header>
  );
};
