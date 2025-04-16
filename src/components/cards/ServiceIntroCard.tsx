import Image from "next/image";
import CardContainer from "../ui/CardContainer";

const ServiceIntroCard = () => {
  return (
    <CardContainer className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-16 p-6 sm:p-10 md:p-20 w-full overflow-hidden">
      <div className="flex flex-col justify-center gap-4 sm:gap-[21px]">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.5em] text-center md:text-left text-white">
          수많은 사장님들이&nbsp;
          <br className="lg:hidden" />
          믿고 거래하는
          <br />
          <span className="text-[#D95204]">금 도매 1위 앱 </span>
          &apos;업스토어&apos;
        </span>
        <span className="text-base sm:text-lg md:text-lg font-normal leading-[1.5em] text-center md:text-left text-white">
          그 업스토어에서 만든 플랫폼, 소금은 신뢰를 바탕으로 금 거래의 새로운 기준이 됩니다.
          <br />내 금, 안전하고 높은 가격에 거래해보세요.
        </span>
      </div>
      <div className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] mt-4 md:mt-0">
        {/* 원본 이미지 */}
        <div className="relative w-full h-full rounded-[12px] sm:rounded-[16px] md:rounded-[22px] overflow-hidden">
          <Image src="/assets/image_9d0a77cb.png" alt="Upstore App" layout="fill" objectFit="contain" />
        </div>
        {/* 반사 효과를 위한 이미지 (position absolute 사용) */}
        <div
          className="absolute bottom-[-120px] sm:bottom-[-150px] md:bottom-[-179px] left-0 w-full h-[120px] sm:h-[150px] md:h-[180px] transform scale-y-[-1] overflow-hidden rounded-[12px] sm:rounded-[16px] md:rounded-[22px]"
          style={{
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 60%)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0) 60%)",
            // 테두리 블러 효과: 블러 반경과 spread 값을 늘려 부드럽게 처리
            boxShadow: "0px 0px 20px 20px rgba(255,255,255,1)",
          }}
        >
          <div
            className="w-full h-full rounded-[12px] sm:rounded-[16px] md:rounded-[22px] overflow-hidden"
            style={{
              // 내부에도 동일한 효과 적용 (필요에 따라 생략 가능)
              boxShadow: "0px 0px 20px 20px rgba(255,255,255,1)",
            }}
          >
            <Image
              src="/assets/image_9d0a77cb_reflection.png"
              alt="Upstore App Reflection"
              layout="fill"
              objectFit="cover"
              className="opacity-50 blur-sm"
            />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default ServiceIntroCard;
