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
  hidden: { rotate: 0, scale: 0.8, opacity: 0 },
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      rotate: {
        delay: 0.5,
        repeat: Infinity,
        repeatDelay: 1.5,
        duration: 0.5,
        ease: "easeInOut",
        keyframes: [0, -8, 8, -8, 8, 0],
      },
      scale: { duration: 0.4 },
      opacity: { duration: 0.4 },
    },
  },
};

const trendingUpVariants = {
  hidden: { y: 10, scaleY: 0.5, opacity: 0 },
  visible: {
    y: 0,
    scaleY: 1,
    opacity: 1,
    transition: {
      scaleY: {
        delay: 0.7,
        repeat: Infinity,
        repeatType: "mirror",
        repeatDelay: 1.0,
        duration: 0.6,
        ease: "easeInOut",
        keyframes: [1, 1.3, 1],
      },
      y: { duration: 0.4 },
      opacity: { duration: 0.4 },
    },
  },
};

const handVariants = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const coinVariants = {
  hidden: { y: -15, opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    y: [0, 30],
    opacity: [1, 0],
    scale: 1,
    transition: {
      repeat: Infinity,
      repeatDelay: 2,
      delay: i * 0.3 + 0.8,
      duration: 1.0,
      ease: "easeIn",
    },
  }),
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
        className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
      >
        {[
          {
            icon: TrendingUp,
            title: "매일 쌓이는 보관 리워드",
            description: "보유량에 따라 매일 리워드가 자동 적립!\n금테크의 새로운 기준.",
            hightLight: "보관 중량의 최소 연 4% 리워드 보장",
            animationVariants: trendingUpVariants,
          },
          {
            icon: HandCoins,
            title: "국내 최고가 현금 매각",
            description: "원할 때 언제든 클릭 한 번으로\n대한민국 최고가 매입 보장!",
            hightLight: "최고가 매각이 아닐 시 차액의 최대 10배 보상",
            animationVariants: handVariants,
            isHandCoin: true,
          },
        ]
          .filter((item) => item.icon !== Lock)
          .map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-[#1a0e07] p-8 rounded-lg border border-white/10 flex flex-col items-center text-center h-full"
            >
              <div className="relative mb-6 h-16 w-12 flex justify-center items-center">
                <motion.div variants={item.animationVariants || iconVariants}>
                  <item.icon className="w-12 h-12 text-amber-400" />
                </motion.div>
                {item.isHandCoin &&
                  [0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={coinVariants}
                      className="absolute w-2 h-2 bg-amber-300 rounded-full"
                      style={{
                        top: `10%`,
                        left: `${40 + i * 10}%`,
                        translateX: "-50%",
                      }}
                    />
                  ))}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-lg text-gray-300 whitespace-pre-line">{item.description}</p>
              {item.hightLight && <p className="text-lg text-amber-400 mt-2 font-semibold">{item.hightLight}</p>}
            </motion.div>
          ))}
      </motion.div>
    </div>
  </section>
);

// You will replace BenefitsSectionOriginal with the new BenefitsSection implementation below.
