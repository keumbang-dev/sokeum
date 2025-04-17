"use client";

import { useEffect } from "react";
import { logEvent } from "@/lib/amplitude";
import { useDeviceType } from "@/hooks/useDeviceType";

export default function HomePageTracker() {
  // 디바이스 타입 가져오기
  const deviceType = useDeviceType();

  useEffect(() => {
    // 사용자 에이전트를 기반으로 추가 브라우저/OS 정보 수집
    const userAgent = window.navigator.userAgent;
    const browser = detectBrowser(userAgent);
    const os = detectOS(userAgent);

    // 홈페이지 접속 이벤트 기록 (디바이스 타입 및 브라우저 정보 포함)
    logEvent("page_view", {
      page: "home",
      device_type: deviceType,
      browser,
      os,
    });
  }, [deviceType]); // deviceType이 변경될 때마다 이벤트 다시 기록

  // 간단한 브라우저 감지 함수
  const detectBrowser = (userAgent: string): string => {
    if (userAgent.indexOf("Chrome") > -1) return "Chrome";
    if (userAgent.indexOf("Safari") > -1) return "Safari";
    if (userAgent.indexOf("Firefox") > -1) return "Firefox";
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "IE";
    if (userAgent.indexOf("Edge") > -1) return "Edge";
    return "Unknown";
  };

  // 간단한 OS 감지 함수
  const detectOS = (userAgent: string): string => {
    if (userAgent.indexOf("Win") > -1) return "Windows";
    if (userAgent.indexOf("Mac") > -1) return "MacOS";
    if (userAgent.indexOf("Linux") > -1) return "Linux";
    if (userAgent.indexOf("Android") > -1) return "Android";
    if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) return "iOS";
    return "Unknown";
  };

  // 이 컴포넌트는 UI를 렌더링하지 않고 추적만 수행합니다
  return null;
}
