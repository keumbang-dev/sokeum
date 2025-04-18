"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";
import { ArrowDown } from "lucide-react";

// 말풍선 컴포넌트 (스타일링은 Tailwind 사용)
const SpeechBubble = ({ text, style }: { text: string; style: MotionStyle }) => (
  <motion.div
    style={style}
    className="absolute bg-white text-gray-800 p-3 md:p-8 rounded-lg shadow-md max-w-[160px] md:max-w-xs text-center text-sm md:text-xl"
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

  // --- Initial Prompt Animation --- (Visible only at the very top)
  const initialPromptOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0]);
  const initialArrowY = useTransform(scrollYProgress, [0, 0.02], [0, -20]); // Move arrow up slightly on scroll

  // --- Adjust existing animation ranges to start slightly later ---
  const animationStartOffset = 0.05; // Start animations after a small scroll

  const bubble1Range = [0.05, 0.2].map((p) => p * (1 - animationStartOffset) + animationStartOffset);
  const bubble2Range = [0.25, 0.4].map((p) => p * (1 - animationStartOffset) + animationStartOffset);
  const bubble3Range = [0.45, 0.6].map((p) => p * (1 - animationStartOffset) + animationStartOffset);
  const popRange = [0.6, 0.65].map((p) => p * (1 - animationStartOffset) + animationStartOffset);
  const finalRevealRange = [0.7, 0.9].map((p) => p * (1 - animationStartOffset) + animationStartOffset);
  const characterFadeOutRange = [0.8, 1].map((p) => p * (1 - animationStartOffset) + animationStartOffset);

  // --- Existing Animations (Outputs based on adjusted ranges) ---
  // Ensure these start fading in AFTER the initial prompt fades out
  const mainContentOpacity = useTransform(
    scrollYProgress,
    [0, animationStartOffset * 0.8, animationStartOffset],
    [0, 0, 1]
  );

  // Character state (Fade in after prompt fades out)
  const thinkingOpacity = useTransform(scrollYProgress, [animationStartOffset, popRange[0], popRange[1]], [1, 1, 0]);
  const ahaOpacity = useTransform(
    scrollYProgress,
    [popRange[0], popRange[1], characterFadeOutRange[0], characterFadeOutRange[1]],
    [0, 1, 1, 0]
  );

  // Bubbles (Fade in after prompt fades out)
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
  const bubble1Y = useTransform(scrollYProgress, [bubble1Range[0], bubble1Range[1]], ["-10%", "-15%"]);

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

  // Final message (Fade in based on adjusted range)
  const finalOpacity = useTransform(
    scrollYProgress,
    [finalRevealRange[0] - 0.05, finalRevealRange[0], finalRevealRange[1]],
    [0, 1, 1]
  );
  const finalScale = useTransform(scrollYProgress, [finalRevealRange[0] - 0.05, finalRevealRange[0]], [0.8, 1]);

  // Background Opacity (No change needed here usually)
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <div ref={targetRef} className="relative h-[900vh] sm:h-[600vh] w-full">
      <motion.div
        style={{ opacity: backgroundOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#110703] flex flex-col items-center justify-center"
      >
        {/* --- Initial Prompt Elements --- */}
        <motion.div
          style={{ opacity: initialPromptOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <h2 className="text-2xl md:text-6xl font-bold text-amber-400 mb-4">혹시 집에 금, 그대로 두고 계신가요?</h2>
          <p className="text-base md:text-2xl text-white mb-8">아래로 스크롤해서 똑똑한 활용법을 만나보세요!</p>
          <motion.div
            style={{ y: initialArrowY }}
            animate={{ y: [0, 10, 0] }} // Arrow bounce animation
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* --- Main Animation Content (Fades in after scroll starts) --- */}
        <motion.div
          style={{ opacity: mainContentOpacity }} // Control overall opacity of the animation elements
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Character */}
          <motion.div className="absolute text-center bottom-[35%] text-6xl md:text-8xl z-10">
            {/* Apply thinkingOpacity to the span directly */}
            <motion.span style={{ opacity: thinkingOpacity }}>🤔</motion.span>
          </motion.div>

          {/* Bubbles */}
          <SpeechBubble
            text="헤어졌는데 커플링 어쩌지.."
            style={{ opacity: bubble1Opacity, scale: bubble1Scale, y: bubble1Y, x: "-50%", top: "35%" }}
          />
          <SpeechBubble
            text="실물 금 투자를 해보고 싶은데.."
            style={{ opacity: bubble2Opacity, scale: bubble2Scale, y: bubble2Y, x: "0%", top: "30%" }}
          />
          <SpeechBubble
            text="집에 안 쓰는 귀금속이 있는데.."
            style={{ opacity: bubble3Opacity, scale: bubble3Scale, y: bubble3Y, x: "50%", top: "35%" }}
          />

          {/* Final Message */}
          <motion.div style={{ opacity: finalOpacity, scale: finalScale }} className="absolute text-center px-8 z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-transparent bg-clip-text">
              소중한 당신의 금,
              <br /> 소금에 맡기세요
            </h1>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
