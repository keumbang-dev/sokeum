"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";

// 말풍선 컴포넌트 (스타일링은 Tailwind 사용)
const SpeechBubble = ({ text, style }: { text: string; style: MotionStyle }) => (
  <motion.div
    style={style}
    className="absolute bg-white text-gray-800 p-4 md:p-8 rounded-lg shadow-md max-w-[200px] md:max-w-xs text-center text-base md:text-xl"
  >
    {text}
    {/* 꼬리 부분 (간단한 삼각형) */}
    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-8px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
  </motion.div>
);

export const IntroScrollAnimation = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- 애니메이션 단계별 설정 (0 ~ 1) ---
  const characterXRange = [-1, 0.2, 0.4, 0.6, 0.7, 1]; // 캐릭터 X 위치 변경 시점
  const bubble1Range = [0.05, 0.2]; // 말풍선 1 표시 구간
  const bubble2Range = [0.25, 0.4]; // 말풍선 2 표시 구간
  const bubble3Range = [0.45, 0.6]; // 말풍선 3 표시 구간
  const popRange = [0.6, 0.65]; // 말풍선 터지는 구간
  const finalRevealRange = [0.7, 0.9]; // 최종 메시지 표시 구간
  const characterFadeOutRange = [0.8, 1]; // 캐릭터 사라지는 구간

  // 캐릭터 상태 (🤔 -> ✨)
  const thinkingOpacity = useTransform(scrollYProgress, [0, 0.6, 0.65], [1, 1, 0]);
  const ahaOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.65, characterFadeOutRange[0], characterFadeOutRange[1]],
    [0, 1, 1, 0]
  );

  // 말풍선 1 애니메이션
  const bubble1Opacity = useTransform(
    scrollYProgress,
    [bubble1Range[0] - 0.02, bubble1Range[0], bubble1Range[1], popRange[0]],
    [0, 1, 1, 0]
  );
  const bubble1Scale = useTransform(
    scrollYProgress,
    [bubble1Range[0] - 0.02, bubble1Range[0], popRange[0], popRange[1]],
    [0.5, 1, 1, 0]
  );
  const bubble1Y = useTransform(scrollYProgress, [bubble1Range[0], bubble1Range[1]], ["-10%", "-15%"]); // 약간 위로 이동

  // 말풍선 2 애니메이션
  const bubble2Opacity = useTransform(
    scrollYProgress,
    [bubble2Range[0] - 0.02, bubble2Range[0], bubble2Range[1], popRange[0]],
    [0, 1, 1, 0]
  );
  const bubble2Scale = useTransform(
    scrollYProgress,
    [bubble2Range[0] - 0.02, bubble2Range[0], popRange[0], popRange[1]],
    [0.5, 1, 1, 0]
  );
  const bubble2Y = useTransform(scrollYProgress, [bubble2Range[0], bubble2Range[1]], ["-10%", "-15%"]);

  // 말풍선 3 애니메이션
  const bubble3Opacity = useTransform(
    scrollYProgress,
    [bubble3Range[0] - 0.02, bubble3Range[0], bubble3Range[1], popRange[0]],
    [0, 1, 1, 0]
  );
  const bubble3Scale = useTransform(
    scrollYProgress,
    [bubble3Range[0] - 0.02, bubble3Range[0], popRange[0], popRange[1]],
    [0.5, 1, 1, 0]
  );
  const bubble3Y = useTransform(scrollYProgress, [bubble3Range[0], bubble3Range[1]], ["-10%", "-15%"]);

  // 최종 메시지 애니메이션
  const finalOpacity = useTransform(
    scrollYProgress,
    [finalRevealRange[0] - 0.05, finalRevealRange[0], finalRevealRange[1]],
    [0, 1, 1]
  );
  const finalScale = useTransform(scrollYProgress, [finalRevealRange[0] - 0.05, finalRevealRange[0]], [0.8, 1]);

  // 배경 Opacity (기존 유지)
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <div ref={targetRef} className="relative h-[900vh] w-full">
      {" "}
      {/* 높이 조절 */}
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#110703] flex items-center justify-center"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* 캐릭터 */}
          <motion.div className="absolute bottom-[35%] text-6xl md:text-8xl z-10">
            <motion.span style={{ opacity: thinkingOpacity, position: "absolute", top: 0, left: 0 }}>🤔</motion.span>
          </motion.div>

          {/* 말풍선 1 */}
          <SpeechBubble
            text="최근에 헤어졌는데.."
            style={{ opacity: bubble1Opacity, scale: bubble1Scale, y: bubble1Y, x: "-60%", top: "35%" }}
          />

          {/* 말풍선 2 */}
          <SpeechBubble
            text="실물 금 투자를 해보고 싶은데.."
            style={{ opacity: bubble2Opacity, scale: bubble2Scale, y: bubble2Y, x: "0%", top: "30%" }}
          />

          {/* 말풍선 3 */}
          <SpeechBubble
            text="집에 안 쓰는 귀금속이 있는데.."
            style={{ opacity: bubble3Opacity, scale: bubble3Scale, y: bubble3Y, x: "60%", top: "35%" }}
          />

          {/* 최종 메시지 */}
          <motion.div style={{ opacity: finalOpacity, scale: finalScale }} className="absolute text-center px-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-transparent bg-clip-text">
              소중한 당신의 금,
              <br /> 소금에 맡기세요
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
