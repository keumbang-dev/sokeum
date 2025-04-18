"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  ChevronDown,
  Lock,
  TrendingUp,
  HandCoins,
  Package,
  Smartphone,
  Banknote,
  Quote,
  Download,
  UserPlus,
  MapPin,
  Phone,
} from "lucide-react";
import { Metadata } from "next"; // Assuming Metadata type is available or defined elsewhere if needed client-side
import { Header } from "@/app/newone/components/Header";
import { IntroScrollAnimation } from "@/app/newone/components/IntroScrollAnimation";
import { HeroSection } from "@/app/newone/components/HeroSection";
import { BenefitsSection } from "@/app/newone/components/BenefitsSection";
import { HowItWorksSection } from "@/app/newone/components/HowItWorksSection";
import { RewardSimulatorSection } from "@/app/newone/components/RewardSimulatorSection";
import { TestimonialsSection } from "@/app/newone/components/TestimonialsSection";
import { FaqSection } from "@/app/newone/components/FaqSection";
import { FinalCtaSection } from "@/app/newone/components/FinalCtaSection";
import { Footer } from "@/app/newone/components/Footer";
import ServiceIntroCard from "@/components/cards/ServiceIntroCard";
import SokeumLogo from "@/components/ui/SokeumLogo";
import ServiceInfo from "@/app/newone/components/ServiceInfo";
import ScrollGuide from "@/app/newone/components/ScrollGuide";
import { BenefitsSectionOriginal } from "@/app/newone/components/BenefitsSectionOriginal";

// --- Component Imports (Placeholders for actual components if separated) ---
// import Header from '@/components/layout/Header'; // Assuming Header is adapted for this page or a new one is made
// import Footer from '@/components/layout/Footer'; // Assuming Footer is adapted

// Define sections for the guide
const sections = [
  { id: "intro", name: "인트로" },
  //{ id: "benefits", name: "핵심 혜택" },
  { id: "hero", name: "금고 보관" },
  { id: "faq", name: "자주 묻는 질문" },
  { id: "about", name: "서비스 소개" },
];

// --- Main Page Component ---
export default function NewLandingPage() {
  // Removed useState for showTrustInfo as ServiceInfo component handles it now

  // SEO Metadata (Example - Needs refinement based on actual deployment)
  // Note: Metadata should ideally be defined outside the client component
  // For this example structure, we'll assume it's handled at a higher level or defined statically
  /*
  export const metadata: Metadata = {
    title: '소금(SoGold) | 장롱금을 금고에 보관하고 보관 보너스를 받으세요',
    description: '집에 잠자는 금, 이제 소금 디지털 금고에서 안전하게 보관하고 매일 쌓이는 Gold Bonus 혜택까지! 대한민국 최고가 매입 보장. 무료 감정, 택배 지원.',
    keywords: ['금 보관', '디지털 금고', '금 투자', '금 매입', '최고가 금 매입', '금 시세', '보관 리워드', 'SoGold', '소금'],
    openGraph: {
       title: '소금(SoGold) | 장롱금을 금고에 보관하고 보관 보너스를 받으세요',
       description: '안전한 디지털 금고, 매일 쌓이는 보관 리워드, 업계 최고가 매입 보장. 소금에서 금테크를 시작하세요.',
       // url: 'https://www.sogold.com', // Replace with actual URL
       siteName: '소금(SoGold)',
       images: [
         {
           url: '/og-image-sogold.jpg', // Replace with actual OG image path
           width: 1200,
           height: 630,
           alt: '소금(SoGold) 서비스 소개',
         },
       ],
       locale: 'ko_KR',
       type: 'website',
    },
    // metadataBase: new URL('https://www.sogold.com'), // Replace with actual URL
    // alternates: {
    //   canonical: '/',
    // },
  };
  */

  return (
    <div className="bg-[#110703] text-white relative">
      {/* <HomePageTracker /> */} {/* Include if needed */}
      <Header /> {/* Use adapted/new Header */}
      <ScrollGuide sections={sections} />
      <div id="intro">
        <IntroScrollAnimation />
      </div>
      <main>
        <div id="hero">
          <HeroSection />
          <BenefitsSectionOriginal />
          <HowItWorksSection />
          <RewardSimulatorSection />
          <TestimonialsSection />
        </div>
        <div id="faq">
          <FaqSection />
        </div>
        <div id="about">
          <ServiceInfo />
          <FinalCtaSection />
        </div>
      </main>
      <Footer /> {/* Use adapted/new Footer */}
    </div>
  );
}
