import ServiceIntroCard from "@/components/cards/ServiceIntroCard";

function ServiceInfo() {
  return (
    <div id="section-about" className="flex flex-col items-center w-full gap-8 sm:gap-8 md:gap-8 py-16 md:py-24 px-4">
      <span className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.5em] text-center text-white">
        소중한 나의 금, 믿고 맡길 수 있을까?
      </span>
      <ServiceIntroCard />
      <div className="mt-8 text-center text-gray-300 space-y-3 px-4">
        <p className="text-base md:text-lg">
          <strong className="text-amber-400">KRX(한국거래소) 인증 업체:</strong> 금 현물 시장의 엄격한 기준을 통과한
          믿을 수 있는 서비스입니다.
        </p>
        <p className="text-base md:text-lg">
          <strong className="text-amber-400">세계 최초 사업자간 디지털 금 &quot;금Pay&quot; 서비스 운영:</strong> 금
          거래의 혁신을 선도하며 기술력을 입증했습니다.
        </p>
        <p className="text-base md:text-lg">
          수많은 대한민국 금시장 도소매 사업자분들의 <strong className="text-white font-semibold">선택</strong>, 그것이
          소금의 <strong className="text-white font-semibold">신뢰도</strong>입니다.
        </p>
      </div>
    </div>
  );
}

export default ServiceInfo;
