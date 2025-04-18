import React from "react";
import { motion } from "framer-motion";
import { Package, Download, UserPlus } from "lucide-react";

export const FinalCtaSection = () => (
  <section className="py-24 px-4 text-center bg-[#110703]">
    <div className="container mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        이제, 당신의 금에게도 <br />
        <span className="text-amber-400">일할 기회</span>를 주세요!
      </h2>
      <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
        안전한 보관은 기본, 매일 쌓이는 보관 리워드와 최고가 현금화까지.
        <br /> 지금 바로 소금을 시작해보세요.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
        >
          <Package className="w-5 h-5" /> 내 금 보내기 (무료 감정)
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" /> 앱 다운로드
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border border-white/50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center gap-2"
        >
          <UserPlus className="w-5 h-5" /> 웹에서 가입하기
        </motion.button>
      </div>
    </div>
  </section>
);
