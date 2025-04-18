import React from "react";
import { motion } from "framer-motion";
import { Lock, TrendingUp, HandCoins } from "lucide-react";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const lockVariants = {
  hidden: { rotate: -10, scale: 0.8 },
  visible: {
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const trendingUpVariants = {
  hidden: { y: 10, scaleY: 0.5, opacity: 0 },
  visible: {
    y: 0,
    scaleY: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.1 },
  },
};

const handVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    // State when card becomes visible
    y: [0, -4, 0], // Apply repeating animation directly here
    opacity: 1,
    transition: {
      opacity: { duration: 0.5 }, // Transition for opacity
      y: { repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }, // Transition for y (repeating)
    },
  },
};

const coinVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: [0, 1, 1, 0], // 나타났다가 떨어지고 사라짐
    transition: {
      delay: i * 0.2 + 0.5, // 순차적으로 떨어짐
      duration: 0.8,
      ease: "easeIn",
      times: [0, 0.2, 0.8, 1],
    },
  }),
  // exit state removed as AnimatePresence is not used here
};

// This component is kept separate for now, but will be replaced by the new scroll snap version.
export const BenefitsSectionOriginal = () => (
  <section className="py-20 px-4 bg-[#110703]">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        잠자는 금, <span className="text-amber-400">소금이 해결합니다</span>
      </h2>
      <p className="text-gray-400 mb-12 max-w-xl mx-auto">
        더 이상 복잡하게 고민하지 마세요. 소금은 안전하고, 투명하며, 최고의 혜택을 약속합니다.
      </p>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {[
          {
            icon: Lock,
            title: "안전한 디지털 금고",
            description: "보험 가입된 금고 보관, 언제든 실시간 잔고 확인. 분실·도난 걱정 끝!",
            animationVariants: lockVariants, // 아이콘별 variant 추가
          },
          {
            icon: TrendingUp,
            title: "매일 쌓이는 보관 리워드",
            description: "보유량에 따라 매일 Gold Bonus가 자동 적립! 금테크의 새로운 기준.",
            animationVariants: trendingUpVariants,
          },
          {
            icon: HandCoins,
            title: "국내 최고가 현금 매각",
            description: "원할 때 언제든 클릭 한 번으로 대한민국 최고가 매입 보장! (24시간 출금)",
            animationVariants: handVariants, // 손 움직임 variant
            isHandCoin: true, // 동전 애니메이션 구분 플래그
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={fadeIn} // Card fades in (staggered by parent)
            className="bg-[#1a0e07] p-8 rounded-lg border border-white/10 flex flex-col items-center text-center"
          >
            {/* Use a standard div for layout, motion handled inside */}
            <div className="relative mb-4 h-16 w-12 flex justify-center items-center">
              {" "}
              {/* Added fixed height for stability */} {/* Icon motion div inherits animate state from card */}
              <motion.div
                variants={item.animationVariants || iconVariants} // Apply variants for hidden/visible states
                // No initial/animate/whileInView needed - handled by variant inheritance
              >
                <item.icon className="w-12 h-12 text-amber-400" />
              </motion.div>
              {/* HandCoins: Coins motion div inherits animate state */}
              {item.isHandCoin &&
                [0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    custom={i} // Pass index to variant
                    variants={coinVariants} // Apply coin variants
                    // No initial/animate/whileInView needed - handled by variant inheritance
                    className="absolute w-2 h-2 bg-amber-300 rounded-full"
                    style={{
                      top: `${10 + i * 5}%`,
                      left: `${40 + i * 10}%`,
                      translateX: "-50%",
                    }}
                  />
                ))}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// You will replace BenefitsSectionOriginal with the new BenefitsSection implementation below.
