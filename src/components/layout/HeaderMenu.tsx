"use client";

import { useState, useEffect } from "react";

// 타입 정의
interface AmplitudeWindow extends Window {
  amplitude?: {
    track: (eventName: string, eventProperties?: Record<string, unknown>) => void;
  };
}

export interface MenuItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

const MenuItem = ({ href, label, isActive }: MenuItemProps) => {
  // 스크롤 이동 함수
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    // Amplitude 이벤트 트래킹 - 데스크탑 메뉴 클릭
    if (typeof window !== "undefined" && (window as AmplitudeWindow).amplitude) {
      const amplitude = (window as AmplitudeWindow).amplitude;
      if (amplitude) {
        amplitude.track("click_what_sokeum_btn", {
          device_type: "desktop",
          menu_name: label,
          menu_link: href,
        });
      }
    }

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // 헤더 높이를 고려하여 오프셋 적용
        behavior: "smooth",
      });
    }
  };

  return (
    <a href={href} onClick={handleClick} className="relative inline-block px-4 py-2 text-[15px]">
      <span className={`transition-colors duration-300 ${isActive ? "text-[#D95204]" : "text-white"}`}>{label}</span>
      {/* 언더라인 - 중앙에서 확장되는 애니메이션 */}
      <span
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-[#D95204] transition-all duration-300 ${
          isActive ? "w-[70%]" : "w-0"
        }`}
      />
    </a>
  );
};

export const DesktopMenu = () => {
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

  return (
    <nav className="items-center hidden space-x-1 sm:flex">
      <MenuItem href="#section-gold-price" label="오늘 금 시세" isActive={isActive("#section-gold-price")} />
      <MenuItem href="#section-about" label="소금, 뭐하는 서비스예요?" isActive={isActive("#section-about")} />
    </nav>
  );
};
