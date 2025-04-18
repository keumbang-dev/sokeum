"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

// Helper function (Keep or move to a utils file)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("ko-KR").format(value);
};

export const RewardSimulatorSection = () => {
  const { register, handleSubmit, watch } = useForm<{ goldWeight: number }>({ defaultValues: { goldWeight: 10 } });
  const [estimatedReward, setEstimatedReward] = useState(0);
  const goldWeight = watch("goldWeight");

  // Placeholder: Replace with actual reward calculation logic
  const calculateReward = (weight: number): number => {
    if (!weight || weight <= 0) return 0;
    // Example: 0.01% daily reward on the estimated value (assuming a price per gram)
    const pricePerGram = 90000; // Example price
    const dailyRate = 0.0001; // Example daily reward rate (0.01%)
    return Math.floor(weight * pricePerGram * dailyRate);
  };

  useEffect(() => {
    // Ensure goldWeight is treated as a string before parsing
    const weightString = String(goldWeight);
    const weight = parseFloat(weightString);

    if (!isNaN(weight) && weight > 0) {
      // Also check if weight > 0
      setEstimatedReward(calculateReward(weight));
    } else {
      setEstimatedReward(0); // Set to 0 if input is invalid or non-positive
    }
  }, [goldWeight]);

  return (
    <section className="py-20 px-4 bg-[#1a0e07]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          내 금, 얼마나 <span className="text-amber-400">보너스</span>를 받을까?
        </h2>
        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          보관할 금의 중량(순금 환산 기준)을 입력하고 예상 보관 리워드를 확인해보세요.
        </p>

        <form
          onSubmit={
            handleSubmit(() => {}) // Keep the no-op submit handler
          }
          className="max-w-md mx-auto bg-[#110703] p-8 rounded-lg border border-white/10"
        >
          <div className="mb-6">
            <label htmlFor="goldWeight" className="block text-left text-gray-300 mb-2">
              보관할 금 중량 (g)
            </label>
            <div className="relative">
              <input
                id="goldWeight"
                type="number"
                {...register("goldWeight", { valueAsNumber: true, min: 0.1 })}
                placeholder="예: 37.5"
                className="w-full p-3 pr-12 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                step="0.1"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">g</span>
            </div>
          </div>

          <div className="text-left p-6 bg-amber-500/10 rounded-lg border border-amber-500/30">
            <p className="text-gray-300 mb-1">예상 일일 보관 리워드</p>
            <p className="text-3xl font-bold text-amber-400">{formatCurrency(estimatedReward)}원</p>
            <p className="text-xs text-gray-500 mt-2">*실제 리워드는 금 시세 및 정책에 따라 변동될 수 있습니다.</p>
            <p className="text-xs text-gray-500">*순금(24K) 기준 예상치입니다.</p>
          </div>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-transparent hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-400 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
        >
          지금 바로 금 보내기
        </motion.button>
      </div>
    </section>
  );
};
