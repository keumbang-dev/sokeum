"use client";

import { MenuItemProps } from "@/components/layout/HeaderMenu";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuItem = ({ href, label, isActive, onClick }: MenuItemProps & { onClick: () => void }) => {
  // 스크롤 이동 함수
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // 헤더 높이를 고려하여 오프셋 적용
        behavior: "smooth",
      });
    }

    // 메뉴 닫기 함수 호출
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`flex items-center px-6 py-2 ${
        isActive
          ? "text-[#D95204] bg-gradient-to-r from-[#D95204]/10 to-transparent border-l-2 border-[#D95204]"
          : "text-white hover:bg-black/10 border-l-2 border-transparent"
      } transition-all duration-300 text-base`}
    >
      {label}
    </a>
  );
};

interface MobileMenuContainerProps {
  triggerButton?: React.ReactNode;
}

export const MobileMenuContainer = ({ triggerButton }: MobileMenuContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // 스크롤 방지 효과
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* 기본 트리거 버튼 */}
      {triggerButton || (
        <button className="flex items-center p-2 text-white sm:hidden" onClick={openMenu} aria-label="메뉴 열기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Portal을 사용하여 모달이 헤더의 제약에서 벗어나도록 함 */}
      {isMounted && createPortal(<MobileMenu isOpen={isOpen} onClose={closeMenu} />, document.body)}
    </>
  );
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("section-gold-price");

  // 스크롤 위치에 따라 활성 섹션 업데이트
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = ["section-gold-price", "section-about"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // 헤더 높이와 여유 공간 고려

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // 요소의 상단이 스크롤 위치보다 위에 있고, 요소의 하단이 스크롤 위치보다 아래에 있으면 활성화
          if (offsetTop <= scrollPosition && offsetTop + offsetHeight > scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 로드 시 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 현재 활성화된 메뉴 아이템 확인
  const isActive = (href: string) => {
    const sectionId = href.replace("#", "");
    return sectionId === activeSection;
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`fixed top-0 right-0 w-[70%] max-w-[350px] h-[100dvh] bg-gradient-to-b from-[#1A0E07] to-[#110703] shadow-2xl transition-transform duration-500 ease-out overflow-y-auto overflow-x-hidden ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute p-2 top-6 right-6 text-white/80 hover:text-white focus:outline-none"
          onClick={onClose}
          aria-label="메뉴 닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex flex-col h-full p-6 pt-24">
          <div className="space-y-1">
            <MobileMenuItem
              href="#section-gold-price"
              label="오늘 금 시세"
              isActive={isActive("#section-gold-price")}
              onClick={onClose}
            />
            <MobileMenuItem
              href="#section-about"
              label="소금, 뭐하는 서비스예요?"
              isActive={isActive("#section-about")}
              onClick={onClose}
            />
          </div>

          <div className="pt-6 mt-auto border-t border-white/10">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-black/20">
              <div className="p-3 rounded-full bg-[#D95204]/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="#D95204"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/60">고객센터</p>
                <a href="tel:02-2272-9897" className="text-lg font-bold text-white">
                  02-2272-9897
                </a>
              </div>
            </div>

            <div className="flex justify-between px-1 pb-6 mt-8">
              <a
                href="https://map.naver.com/p/entry/address/14136588.0604458,4518868.5821193,%EC%84%9C%EC%9A%B8%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%A2%85%EB%A1%9C%20122?c=15.00,0,0,0,dh"
                className="flex items-center gap-2 transition-colors text-white/70 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">오시는 길</span>
              </a>
              <a
                href="https://www.instagram.com/sokeum_official/"
                className="flex items-center gap-2 transition-colors text-white/70 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 6.5h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">인스타그램</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
