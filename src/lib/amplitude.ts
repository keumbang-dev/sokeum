import { init, track } from "@amplitude/analytics-browser";

// Amplitude API 키
// 실제 환경에서는 환경 변수를 사용하는 것이 좋습니다.
const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || "YOUR_AMPLITUDE_API_KEY";

/**
 * Amplitude 초기화 함수
 */
export const initAmplitude = () => {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== "undefined") {
    init(API_KEY, {
      // 선택적 설정
      defaultTracking: true, // 페이지 뷰, 세션 등 기본 이벤트 추적
    });
  }
};

/**
 * 이벤트 추적 함수
 * @param eventName 이벤트 이름
 * @param eventProperties 이벤트 속성
 */
export const logEvent = (eventName: string, eventProperties?: Record<string, unknown>) => {
  // 클라이언트 사이드에서만 실행
  if (typeof window !== "undefined") {
    track(eventName, eventProperties);
  }
};
