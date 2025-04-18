"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const faqs = [
  {
    q: "어떤 종류의 금을 보낼 수 있나요?",
    a: "순금, 18K, 14K 등 모든 종류의 금 제품(쥬얼리, 스크랩, 골드바 등)을 보내실 수 있습니다. 전문 감정팀이 정확하게 감정하여 순금 기준으로 환산해 드립니다.",
  },
  {
    q: "보관된 금은 안전한가요?",
    a: "네, 고객님의 금은 최첨단 보안 시스템과 보험이 적용된 금고에 안전하게 보관됩니다. 또한 언제든지 앱/웹에서 실시간 보유 현황을 투명하게 확인하실 수 있습니다.",
  },
  {
    q: "보관 리워드는 어떻게 계산되나요?",
    a: "보관 리워드는 고객님께서 보관 중인 순금 중량과 실시간 금 시세를 기준으로 매일 계산되어 자동 적립됩니다. 자세한 계산 방식은 서비스 내 '리워드 안내'를 참고해주세요.",
  },
  {
    q: "현금 매각 시 가격은 어떻게 결정되나요?",
    a: "'대한민국 최고가 매입 보장'을 약속드립니다. 국내 주요 금 거래소 시세를 실시간으로 반영하여 업계 최고 수준의 매입가를 제공합니다.",
  },
  {
    q: "실물 금으로 다시 받을 수도 있나요?",
    a: "네, 원하실 때 언제든지 보관 중인 금을 실물 순금(골드바, 콩알금 등)으로 무료로 인출 신청하실 수 있습니다.",
  },
];

export const FaqSection = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]); // Store multiple open indices

  const toggleFaq = (index: number) => {
    setOpenIndices(
      (prevIndices) =>
        prevIndices.includes(index)
          ? prevIndices.filter((i) => i !== index) // Close if already open
          : [...prevIndices, index] // Open if closed
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a0e07] to-[#110703]">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">자주 묻는 질문</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1a0e07] rounded-lg border border-white/10 overflow-hidden">
              <button
                onClick={() => toggleFaq(index)} // Use new toggle function
                className="w-full flex justify-between items-center p-5 text-left text-white"
                aria-expanded={openIndices.includes(index)} // Check if index is in the array
                aria-controls={`faq-content-${index}`}
              >
                <span className="font-semibold text-base md:text-lg">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openIndices.includes(index) ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {" "}
                {/* Wrap with AnimatePresence */}
                {openIndices.includes(index) && (
                  <motion.div
                    key="content" // Add key for AnimatePresence
                    id={`faq-content-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-gray-400 text-sm md:text-base">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
