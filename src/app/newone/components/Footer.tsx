import React from "react";
import { MapPin, Phone } from "lucide-react";

// Placeholder for Footer Component (Adapt or Create New)
export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-[#0a0502] text-gray-500 text-sm">
      <div className="container mx-auto text-center">
        <p className="mb-4">(주)소금컴퍼니 | 대표: 김소금 | 사업자등록번호: 123-45-67890</p>
        <p className="mb-4">서울특별시 종로구 돈화문로 00, 5층 | 통신판매업신고: 제2024-서울종로-0000호</p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <a href="tel:02-2272-9897" className="inline-flex items-center gap-1 hover:text-gray-300">
            <Phone size={14} /> 02-2272-9897
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="https://map.naver.com/p/entry/address/14136588.0604458,4518868.5821193,%EC%84%9C%EC%9A%B8%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%A2%85%EB%A1%9C%20122?c=15.00,0,0,0,dh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-gray-300"
          >
            <MapPin size={14} /> 오시는 길
          </a>
        </div>
        <p className="mb-2">
          <a href="/terms" className="hover:text-gray-300">
            이용약관
          </a>{" "}
          |{" "}
          <a href="/privacy" className="hover:text-gray-300">
            개인정보처리방침
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} SoGold Inc. All rights reserved.</p>
        <p className="mt-4 text-xs text-gray-600">
          * 본 서비스는 금융투자상품이 아니며, 원금 손실 가능성이 없습니다. 보관 리워드는 금 시세 및 회사 정책에 따라
          변동될 수 있습니다. <br />* 소금 서비스는 예금자보호법에 따른 보호 대상이 아닙니다.
        </p>
      </div>
    </footer>
  );
};
