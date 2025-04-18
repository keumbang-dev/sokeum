import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const HeroSection = () => (
  <section className="w-full min-h-[70vh] flex items-center justify-center text-center bg-gradient-to-b from-[#1a0e07] to-[#110703] py-20 px-4">
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl">
      {/* Placeholder for 3D Gold Bar Image - Replace with <Image> or animation */}
      <div className="mb-8 text-6xl text-amber-400">🏆</div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
        장롱금을 <span className="text-amber-400">&apos;금고&apos;</span>에 맡기면
        <br />
        <span className="bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">
          보관 보너스
        </span>{" "}
        + 최고가 매입 보장!
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
        집에 잠자고 있는 금, 이제 소금 디지털 금고에서 안전하게 보관하고 매일 쌓이는 Gold Bonus 혜택까지 누리세요.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors"
      >
        내 금 보내고 리워드 받기
      </motion.button>
    </motion.div>
  </section>
);
