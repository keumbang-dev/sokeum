"use client";

import Image from "next/image";
import CardContainer from "../ui/CardContainer";
import { logEvent } from "@/lib/amplitude";
import { useDeviceType } from "@/hooks/useDeviceType";

interface InfoCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  isTel?: boolean;
}

const InfoCard = ({ imageSrc, title, subtitle, buttonText, link, isTel }: InfoCardProps) => {
  // 디바이스 타입 감지
  const deviceType = useDeviceType();

  const buttonClass =
    "flex justify-center items-center self-stretch gap-2 px-4 py-2 sm:p-[20px] rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.16)] to-[rgba(255,255,255,0)] hover:from-[rgba(255,255,255,0.2)] hover:to-[rgba(255,255,255,0.05)] transition-colors duration-200 text-lg sm:text-xl md:text-2xl font-semibold leading-[1.5em] text-center text-white";

  const linkProps = isTel ? { href: `tel:${link}` } : { href: link, target: "_blank", rel: "noopener noreferrer" }; // 새 탭에서 열기

  const handleButtonClick = () => {
    // 공통 이벤트 속성
    const eventProps = {
      device_type: deviceType,
    };

    // 버튼 종류에 따라 다른 이벤트 로깅
    if (isTel) {
      logEvent("click_call_btn", {
        ...eventProps,
        phone_number: link,
      });
    } else {
      logEvent("click_map_btn", {
        ...eventProps,
        map_url: link,
      });
    }
  };

  return (
    <CardContainer className="flex flex-col items-center justify-between flex-1 gap-6 p-6 sm:p-8 md:p-10">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <Image src={imageSrc} alt={title} layout="fill" objectFit="contain" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.5em] text-center text-white">
            {title}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-normal leading-[1.5em] text-center text-white">
            {subtitle}
          </span>
        </div>
      </div>
      <a {...linkProps} className={buttonClass} onClick={handleButtonClick}>
        {buttonText}
      </a>
    </CardContainer>
  );
};

export default InfoCard;
