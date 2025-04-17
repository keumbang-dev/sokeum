"use client";

import { useState, useEffect } from "react";

// 디바이스 타입 정의
export type DeviceType = "desktop" | "tablet" | "mobile";

export const useDeviceType = (): DeviceType => {
  // 초기값은 서버 사이드 렌더링을 위한 기본값
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    // 윈도우 크기에 따라 디바이스 타입 결정하는 함수
    const updateDeviceType = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // 초기 로드 시 디바이스 타입 설정
    updateDeviceType();

    // 리사이즈 이벤트에 반응하여 디바이스 타입 업데이트
    window.addEventListener("resize", updateDeviceType);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  return deviceType;
};
