import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoldPriceCard from "@/components/cards/GoldPriceCard";
import { goldPriceData } from "@/components/cards/GoldPriceCard";
import GoldCalculatorCard from "@/components/cards/GoldCalculatorCard";
import ServiceIntroCard from "@/components/cards/ServiceIntroCard";
import InfoCard from "@/components/cards/InfoCard";
import InfoIcon from "@/components/icons/InfoIcon";
import SokeumLogo from "@/components/ui/SokeumLogo";

export const metadata: Metadata = {
  title: "소금 | 소중한 나의 금, 가장 비싸게 파는 방법",
  description:
    "금 매매에 최적화된 가격으로 소중한 금을 거래하세요. 금시세 정보와 실시간 계산기로 편리하게 가격을 확인할 수 있습니다.",
  keywords: ["금 매매", "금 판매", "금 시세", "금 계산기", "금방", "소금"],
  openGraph: {
    title: "소금 | 소중한 나의 금, 가장 비싸게 파는 방법",
    description:
      "금 매매에 최적화된 가격으로 소중한 금을 거래하세요. 금시세 정보와 실시간 계산기로 편리하게 가격을 확인할 수 있습니다.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "소금 서비스 메인 이미지",
      },
    ],
    siteName: "소금 - 소중한 나의 금",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-[#110703] text-white min-h-screen">
      <Header />
      <section className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 self-stretch gap-16 sm:gap-20 md:gap-32 lg:gap-40 py-10 sm:py-16 md:py-24 lg:py-32">
        {/* 메인 캐치프레이즈 */}
        <div id="section-gold-price" className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 w-full">
          <div className="flex flex-col items-center gap-2 w-full max-w-screen-lg">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.5em] text-center text-white">
                소중한 나의 금,
              </span>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.5em] text-center text-white">
                  가장 비싸게 파는 방법?
                </span>
              </div>
            </div>
          </div>
          {/* 가격 비교 및 계산기 */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 sm:gap-10 w-full">
            <GoldPriceCard />
            <GoldCalculatorCard />
          </div>
        </div>
        {/* 구매 관련 안내 */}
        <div className="flex flex-col items-center gap-10 sm:gap-16 md:gap-20 w-full">
          <div className="flex flex-col items-center gap-2 w-full max-w-screen-lg">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.5em] text-center text-white">
                소중한 나의 금,
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl leading-[1.5em] text-center">
                    돈당&nbsp;
                    <span className="font-bold text-[#D95204]">{goldPriceData.sokeumSellPrice.toLocaleString()}</span>
                  </span>
                  <span className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.5em] text-center text-white">
                    원에
                  </span>
                </div>
                <span className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.5em] text-center text-white">
                  팔고싶다면?
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2 mt-2">
              <InfoIcon />
              <span className="text-base sm:text-lg md:text-xl font-medium leading-[1.5em] text-left text-[#737373]">
                사는 건 아직 준비 중이에요.
              </span>
            </div>
          </div>
          {/* 위치 및 전화 정보 카드 */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 sm:gap-10 w-full max-w-screen-lg">
            <InfoCard
              imageSrc="/assets/image_aada6e52.png"
              title="종로3가역 15번 출구 바로 앞"
              subtitle="5층으로 방문해 주세요."
              buttonText="지도에서 보기"
              link="https://map.naver.com/p/entry/address/14136588.0604458,4518868.5821193,%EC%84%9C%EC%9A%B8%20%EC%A2%85%EB%A1%9C%EA%B5%AC%20%EC%A2%85%EB%A1%9C%20122?c=15.00,0,0,0,dh"
            />
            <InfoCard
              imageSrc="/assets/image_99361222.png"
              title="02-2272-9897"
              subtitle="전화 문의도 환영해요."
              buttonText="전화 걸기"
              link="02-2272-9897"
              isTel={true}
            />
          </div>
        </div>
        {/* 소금 서비스 소개 */}
        <div id="section-about" className="flex flex-col items-center gap-10 sm:gap-16 md:gap-20 w-full">
          <div className="flex flex-col items-center gap-2 w-full max-w-screen-lg">
            <div className="flex flex-col items-center">
              <SokeumLogo size="large" />
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.5em] text-center text-white">
                소중한 나의 금, 소금
              </span>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.5em] text-center text-white">
                  믿을만한 서비스인가요?
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-screen-lg">
            <ServiceIntroCard />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
