"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Lock, TrendingUp, HandCoins, Package } from "lucide-react";

const benefits = [
  {
    icon: Lock,
    title: "안전한 디지털 금고",
    subtitle: "보험 가입 금고에 100% 실물 보관",
    description: "실시간 잔고·시세 확인으로 분실·도난 걱정 끝!",
    id: "benefit-1",
  },
  {
    icon: TrendingUp,
    title: "매일 쌓이는 보관 리워드",
    subtitle: "보유량에 따라 Gold Bonus 자동 적립",
    description: "하루 단위로 투명하게 공개, 금테크의 새로운 기준",
    id: "benefit-2",
  },
  {
    icon: HandCoins,
    title: "국내 최고가로 현금 매각",
    subtitle: "최고가 매각이 아닐 시 차액의 최대 10배 보상",
    description: "원클릭 24시간 출금, 수수료·숨은 조건 ZERO",
    id: "benefit-3",
  },
];

// BenefitCard의 내용을 직접 렌더링하기 위한 인터페이스 (내부 사용)
interface BenefitContentProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  isLast?: boolean;
}

const BenefitContent = ({ icon: Icon, title, subtitle, description, isLast = false }: BenefitContentProps) => (
  <div className="max-w-[420px] md:max-w-md lg:max-w-lg w-full py-12 px-6 md:px-10 rounded-3xl border border-[#32251b] bg-[#1b120f]/70 backdrop-blur-md shadow-xl flex flex-col items-center text-center">
    <Icon className="w-12 h-12 md:w-16 md:h-16 text-[#D9A441] mb-6" aria-hidden="true" />
    <h2 role="heading" aria-level={2} className="text-2xl md:text-3xl font-bold text-white mb-3">
      {title}
    </h2>
    <p className="text-base md:text-lg text-amber-300 mb-4 font-medium">{subtitle}</p>
    <p className="text-sm md:text-base text-gray-300">{description}</p>

    {isLast && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg text-base md:text-lg transition-colors inline-flex items-center justify-center gap-2"
      >
        <Package className="w-5 h-5" /> 내 금 보내고 리워드 시작하기
      </motion.button>
    )}
  </div>
);

// AnimatedBenefitCard: 개별 카드의 애니메이션을 처리하는 자식 컴포넌트
interface AnimatedBenefitCardProps extends BenefitContentProps {
  id: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  cardRanges: number[][];
}

const AnimatedBenefitCard = ({ id, index, scrollYProgress, cardRanges, ...contentProps }: AnimatedBenefitCardProps) => {
  const [start, end] = cardRanges[index];
  // 카드가 나타나고 사라지는 구간 정의 (애니메이션 부드럽게)
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  // 카드가 나타날 때 약간 커지고, 사라질 때 약간 작아지는 효과
  const scale = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0.85, 1, 1, 0.85]);

  return (
    <motion.div
      key={id}
      style={{
        opacity,
        scale,
        position: "absolute", // 모든 카드를 같은 위치에 겹침
      }}
      // 패딩을 motion.div로 옮겨 카드 콘텐츠가 중앙에 오도록 함
      className="w-full h-full flex items-center justify-center p-4 md:p-8"
    >
      <BenefitContent {...contentProps} />
    </motion.div>
  );
};

export const BenefitsSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // 전체 높이를 기준으로 스크롤 진행률 계산
  });

  // 각 카드의 표시 구간 정의 (0 ~ 1 사이, 균등 분할)
  const numCards = benefits.length;
  const cardRanges = Array.from({ length: numCards }, (_, i) => [
    i / numCards, // 시작점
    (i + 1) / numCards, // 끝점
  ]);

  // 스포트라이트 효과 - 스크롤에 따라 부드럽게 변화
  // 스포트라이트가 첫 카드 시작 시 나타나고 마지막 카드 끝날 때 사라지도록 조정
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.05, 1 - 0.05, 1], [0, 0.25, 0.25, 0]);
  const backgroundStyle = {
    backgroundImage: `radial-gradient(ellipse 40% 50% at 50% 50%, rgba(217,164,65, var(--spotlight-opacity, 0)) 0%, transparent 70%)`,
    transition: "background-image 0.3s ease-out", // 스포트라이트 부드러운 전환
  };

  return (
    <div ref={targetRef} className="relative h-[800vh] sm:h-[500vh] w-full bg-[#0d0604]">
      {/* Sticky 컨테이너: 실제 보이는 화면 영역 */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
        style={{ ...backgroundStyle, "--spotlight-opacity": spotlightOpacity } as React.CSSProperties} // 타입 단언 추가
      >
        {/* 카드들을 absolute로 배치하여 겹치게 함 */}
        <div className="relative w-full h-full flex items-center justify-center">
          {benefits.map((benefit, index) => (
            <AnimatedBenefitCard
              key={benefit.id}
              id={benefit.id}
              index={index}
              scrollYProgress={scrollYProgress}
              cardRanges={cardRanges}
              icon={benefit.icon}
              title={benefit.title}
              subtitle={benefit.subtitle}
              description={benefit.description}
              isLast={index === benefits.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
