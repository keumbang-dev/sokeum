"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const MenuItem = ({ href, label, isActive }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-base md:text-lg font-medium transition-all duration-300 ease-in-out
      ${isActive ? "text-[#D95204]" : "text-white hover:text-[#D95204]/80"}`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95204] transform scale-x-100 transition-transform duration-300 ease-in-out"></span>
      )}
      {!isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D95204]/80 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
      )}
    </Link>
  );
};

const DesktopMenu = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="hidden sm:flex items-center justify-end flex-1 gap-6 md:gap-8">
      <MenuItem href="/" label="오늘 금 시세" isActive={isActive("/")} />
      <MenuItem href="/description" label="소금, 뭐하는 서비스예요?" isActive={isActive("/description")} />
    </nav>
  );
};

export default DesktopMenu;
