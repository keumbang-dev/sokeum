import React from "react";
import { motion } from "framer-motion";
import { Package, Download, UserPlus } from "lucide-react";
import SokeumLogo from "@/components/ui/SokeumLogo";

export const FinalCtaSection = () => (
  <section className="py-24 px-4 text-center bg-[#110703]">
    <div className="container mx-auto">
      {/*<SokeumLogo size="large" />*/}
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.5em] text-center text-white"></span>

      <h2 className="flex flex-col items-center text-4xl md:text-5xl font-bold text-white mb-6">
        <span className="mb-2">이제, 당신의 금에게도 </span>
        <div className="flex flex-row items-center">
          <span className="text-amber-400">일할 기회</span>를 주세요!
        </div>
      </h2>
      <p className="text-sm md:text-lg text-gray-300 mb-10 max-w-xl mx-auto">
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
      <div className="mt-50 flex flex-col items-center justify-center">
        <SokeumLogo size="large" />
        <span className="text-2xl font-extralight text-[#D95204]">소중한 나의 금</span>
      </div>
    </div>
  </section>
);
