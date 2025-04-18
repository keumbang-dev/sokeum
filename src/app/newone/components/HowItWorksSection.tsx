import React from "react";
import { motion } from "framer-motion";
import { Package, Smartphone, Banknote } from "lucide-react";

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

export const HowItWorksSection = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-[#110703] to-[#1a0e07]">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        소금 이용 방법, <span className="text-amber-400">3단계면 충분해요</span>
      </h2>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-3 gap-10 relative"
      >
        {[
          {
            icon: Package,
            title: "1. 금 보내기",
            description: "무료 택배 또는 직접 방문으로 소중한 금을 보내주세요. (왕복 택배비 지원)",
          },
          {
            icon: Smartphone,
            title: "2. 금고 확인",
            description: "국내 최대 감정팀의 무료 감정 후, 내 디지털 금고에서 실시간 중량과 가치를 확인하세요.",
          },
          {
            icon: Banknote,
            title: "3. 리워드 & 매각",
            description: "매일 보관 리워드를 받고, 원할 때 실물 인출 또는 최고가로 현금 매각하세요.",
            highlight: "최고가 매각이 아닐 시 차액의 최대 10배 보상",
          },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeIn} className="relative z-10 flex flex-col items-center">
            <div className="bg-[#110703] p-6 rounded-full border-2 border-amber-400/50 mb-4 inline-block">
              <item.icon className="w-10 h-10 text-amber-400" />
            </div>
            <div className="w-px h-8 border-l border-dashed border-amber-400/50 my-2"></div>
            <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 max-w-xs text-center">{item.description}</p>
            {item.highlight && (
              <p className="text-amber-400 mt-2 text-base font-medium text-center">{item.highlight}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
