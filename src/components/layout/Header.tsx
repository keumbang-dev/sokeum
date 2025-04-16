"use client";

import SokeumLogo from "../ui/SokeumLogo";
import { DesktopMenu } from "@/components/layout/HeaderMenu";
import { MobileMenuContainer } from "@/components/layout/HeaderMobilMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#110703]/95 backdrop-blur-md border-b border-white/5 w-full max-w-[100vw] overflow-x-hidden">
      <div className="flex justify-between items-center px-4 sm:px-8 py-4 sm:py-5 w-full max-w-[100%]">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <SokeumLogo size="small" className="sm:text-2xl md:text-4xl" />
        </a>

        {/* 데스크톱 메뉴 */}
        <DesktopMenu />

        {/* 모바일 메뉴 컨테이너 */}
        <MobileMenuContainer />
      </div>
    </header>
  );
};

export default Header;
