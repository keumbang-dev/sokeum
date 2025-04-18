import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => (
  <section className="py-20 px-4 bg-[#110703]">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        소금, <span className="text-amber-400">먼저 경험한 분들의 이야기</span>
      </h2>
      {/* Placeholder for slider - Currently a grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            quote: "집에 묵혀둔 목걸이가 이렇게 큰 돈이 될 줄 몰랐어요! 리워드까지 받으니 일석이조!",
            name: "김민지님",
            source: "종로구",
          },
          {
            quote: "택배 보내고 다음 날 바로 입금 확인했어요. 감정도 빠르고 시세도 잘 쳐주네요.",
            name: "박서준님",
            source: "부산시",
          },
          {
            quote: "금고에 넣어두니 안심되고, 매일 보너스 쌓이는 거 보는 재미가 쏠쏠해요. 최고!",
            name: "이하나님",
            source: "온라인",
          },
        ].map((item, index) => (
          <div key={index} className="bg-[#1a0e07] p-8 rounded-lg border border-white/10 text-left relative">
            <Quote
              className="absolute top-4 left-4 w-8 h-8 text-amber-400/30 transform rotate-180"
              aria-hidden="true"
            />
            <p className="text-gray-300 mb-6 italic">&ldquo;{item.quote}&rdquo;</p>
            <p className="text-white font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">{item.source}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
