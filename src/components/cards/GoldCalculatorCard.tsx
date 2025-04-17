"use client";

import React, { useState, useEffect } from "react";
import InfoIcon from "../icons/InfoIcon";
import PurityChip from "../ui/PurityChip";
import KeypadButton from "../ui/KeypadButton";
import CardContainer from "../ui/CardContainer";
import { goldPriceData } from "./GoldPriceCard";
import { logEvent } from "@/lib/amplitude";
import { useDeviceType } from "@/hooks/useDeviceType";

// 소금 내가 팔 때 가격 (GoldPriceCard에서 가져옴)
const SOKEUM_SELL_PRICE = goldPriceData.sokeumSellPrice;

// 소수점 둘째자리 미만 절삭 함수
function truncateToSecondDecimal(num: number): number {
  return Math.floor(num * 100) / 100;
}

// 올바른 소수점 형식인지 확인하는 함수
function isValidDecimalFormat(str: string): boolean {
  // 소수점 이하 2자리까지만 허용하는 정규식
  const regex = /^\d+(\.\d{0,2})?$/;

  // 정규식 먼저 통과해야 함
  if (!regex.test(str)) return false;

  // 숫자값으로 변환해서 범위 체크
  const value = parseFloat(str);
  return value <= 9999.99;
}

const GoldCalculatorCard = () => {
  const [purity, setPurity] = useState("24K");
  const [weight, setWeight] = useState("0");
  const [displayWeight, setDisplayWeight] = useState("0");
  const [calculatedPrice, setCalculatedPrice] = useState("0");
  const deviceType = useDeviceType();

  // displayWeight 업데이트
  useEffect(() => {
    if (weight === "0") {
      setDisplayWeight("0");
    } else {
      const parts = weight.split(".");
      if (parts.length > 1) {
        // 소수점이 있는 경우
        const integerPart = parseInt(parts[0], 10).toLocaleString();
        setDisplayWeight(`${integerPart}.${parts[1]}`);
      } else {
        // 소수점이 없는 경우
        setDisplayWeight(parseInt(weight, 10).toLocaleString());
      }
    }
  }, [weight]);

  const handlePurityChange = (newPurity: string) => {
    setPurity(newPurity);

    // 순도 변경 이벤트 로깅
    logEvent("click_calculate_purity", {
      device_type: deviceType,
      purity_value: newPurity,
      current_weight: weight,
    });
  };

  const handleKeypadClick = (value: string) => {
    // 이전 값 저장
    const prevWeight = weight;

    if (value === "delete") {
      setWeight((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === ".") {
      if (!weight.includes(".")) {
        setWeight((prev) => prev + ".");
      }
    } else {
      // 새 입력값 생성
      const newValue = weight === "0" ? value : weight + value;

      // 소수점 둘째자리까지만 입력 허용
      if (isValidDecimalFormat(newValue)) {
        setWeight(newValue);
      }
    }

    // 키패드 클릭 이벤트 로깅
    logEvent("click_calculate_keypad", {
      device_type: deviceType,
      keypad_value: value,
      previous_weight: prevWeight,
      current_weight:
        weight === "0" && value !== "delete" && value !== "."
          ? value
          : value === "." && !weight.includes(".")
          ? weight + "."
          : value === "delete"
          ? weight.length > 1
            ? weight.slice(0, -1)
            : "0"
          : weight === "0"
          ? value
          : weight + value,
    });
  };

  // 가격 계산 로직
  useEffect(() => {
    const numericWeight = parseFloat(weight);
    if (!isNaN(numericWeight) && numericWeight > 0) {
      let calculatedValue = 0;
      const pricePerDon = SOKEUM_SELL_PRICE; // 1돈 기준 가격
      const pricePerGram = truncateToSecondDecimal(pricePerDon / 3.75); // 1g당 가격 (소수점 둘째자리 미만 절삭)

      // 순도별 계산 로직
      switch (purity) {
        case "24K":
          // 입력한 input값 * sokeum 내가 팔 때 가격 / 3.75 (소수점 둘째자리 미만 절삭)
          calculatedValue = (numericWeight * pricePerDon) / 3.75;
          break;
        case "22K":
          // ((input * (price / 3.75) 소수점 둘째자리 미만 절삭) * 22/24) 소수점 둘째자리 미만 절삭
          calculatedValue = truncateToSecondDecimal(truncateToSecondDecimal(numericWeight * pricePerGram) * (22 / 24));
          break;
        case "18K":
          // ((input * (price / 3.75) 소수점 둘째자리 미만 절삭) * 0.739) 소수점 둘째자리 미만 절삭
          calculatedValue = truncateToSecondDecimal(truncateToSecondDecimal(numericWeight * pricePerGram) * 0.739);
          break;
        case "14K":
          // ((input * (price / 3.75) 소수점 둘째자리 미만 절삭) * 0.574) 소수점 둘째자리 미만 절삭
          calculatedValue = truncateToSecondDecimal(truncateToSecondDecimal(numericWeight * pricePerGram) * 0.574);
          break;
        case "10K":
          // ((input * (price / 3.75) 소수점 둘째자리 미만 절삭) * 0.4) 소수점 둘째자리 미만 절삭
          calculatedValue = truncateToSecondDecimal(truncateToSecondDecimal(numericWeight * pricePerGram) * 0.4);
          break;
        default:
          calculatedValue = 0;
      }

      // 최종 계산 값을 정수로 변환하고 천 단위 콤마 추가
      setCalculatedPrice(Math.floor(calculatedValue).toLocaleString());
    } else {
      setCalculatedPrice("0");
    }
  }, [weight, purity]);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[449px] md:h-[668px]">
      {/* 순도 선택 */}
      <div className="grid w-full grid-cols-5 gap-3 sm:gap-3">
        {["24K", "22K", "18K", "14K", "10K"].map((p) => (
          <PurityChip key={p} label={p} active={purity === p} onClick={() => handlePurityChange(p)} />
        ))}
      </div>
      {/* 계산기 본체 */}
      <CardContainer className="flex flex-col p-5 sm:p-6 md:p-[30px] w-[240px] sm:w-[360px] flex-1">
        {/* 무게 입력 */}
        <div className="flex flex-col self-stretch gap-2 sm:gap-3">
          <span className="text-sm sm:text-base font-medium leading-[1.45em] text-center text-white">
            예상 중량을 입력해 보세요.
          </span>
          <div className="flex items-baseline self-stretch gap-1 px-3 py-2 bg-white rounded-lg sm:px-4">
            <span
              className={`flex-1 text-xl sm:text-2xl md:text-3xl font-semibold leading-[1.5em] text-right ${
                weight === "0" ? "text-[#D4D4D4]" : "text-[#D95204]"
              }`}
            >
              {displayWeight}
            </span>
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold leading-[1.5em] text-center text-[#737373]">
              g
            </span>
          </div>
        </div>
        {/* 숫자 패드 */}
        <div className="flex flex-col flex-1 w-full max-h-[240px] sm:max-h-[260px] md:max-h-[280px] mx-auto gap-2 sm:gap-3 my-4">
          {[
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            [".", "0", "delete"],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 sm:gap-2 h-[45px] sm:h-[50px] md:h-[55px]">
              {row.map((key) => (
                <KeypadButton key={key} value={key} onClick={handleKeypadClick} />
              ))}
            </div>
          ))}
        </div>
        {/* 예상 가격 출력 */}
        <div className="flex flex-col self-stretch gap-2 mt-auto sm:gap-3">
          <span className="text-sm sm:text-base font-medium leading-[1.45em] text-center text-white">
            이 가격으로 팔 수 있어요!
          </span>
          <div className="flex items-baseline self-stretch gap-1 px-3 py-2 bg-white rounded-lg sm:px-4">
            <span className="flex-1 text-xl sm:text-2xl md:text-3xl font-semibold leading-[1.5em] text-right text-[#D95204]">
              {calculatedPrice}
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold leading-[1.5em] text-center text-[#737373]">
              원
            </span>
          </div>
        </div>
      </CardContainer>
      {/* 하단 설명 */}
      <div className="flex items-center self-stretch justify-center gap-2">
        <InfoIcon />
        <span className="text-sm sm:text-base md:text-xl font-normal leading-[1.5em] text-left text-[#737373]">
          예상 가격으로, 변동이 있을 수 있어요.
        </span>
      </div>
    </div>
  );
};

export default GoldCalculatorCard;
