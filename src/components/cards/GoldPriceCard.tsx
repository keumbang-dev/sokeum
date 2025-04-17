import InfoIcon from "../icons/InfoIcon";
import PriceChangeTag from "../ui/PriceChangeTag";
import CardContainer from "../ui/CardContainer";
import SokeumLogo from "../ui/SokeumLogo";
import { ReactNode } from "react";
import dayjs from "dayjs";

// 거래소 표시 컴포넌트
interface TraderLabelProps {
  color: string;
  children?: ReactNode;
  name?: string;
}

const TraderLabel = ({ color, children, name }: TraderLabelProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ backgroundColor: color }} />
      {children || (
        <>
          <span className="text-sm sm:text-lg md:text-xl font-medium leading-[1.5em] text-left text-white">{name}</span>
        </>
      )}
    </div>
  );
};

// 가격 차이 표시 컴포넌트
const PriceDifference = ({ difference, better }: { difference: number; better: boolean }) => {
  if (difference === 0) return null;

  return (
    <div className={`flex items-center gap-1 ${better ? "text-[#00C087]" : "text-[#FF4D4F]"}`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={better ? "M12 5l7 7H5l7-7z" : "M12 19l-7-7h14l-7 7z"}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="text-xs font-medium sm:text-sm">
        {better ? `${difference.toLocaleString()}원 더 드려요` : `${difference.toLocaleString()}원 더 저렴해요`}
      </span>
    </div>
  );
};

// 가격 정보 컴포넌트
interface PriceInfoProps {
  sellPrice: number;
  buyPrice: number;
  priceChange: number;
  percentChange: number;
  sellDifference?: number;
  buyDifference?: number;
  isSokeum?: boolean;
}

const PriceInfo = ({
  sellPrice,
  buyPrice,
  priceChange,
  percentChange,
  sellDifference = 0,
  buyDifference = 0,
  isSokeum = false,
}: PriceInfoProps) => {
  return (
    <>
      {/* 모바일 뷰 - 세로 배열 */}
      <div className="flex flex-col w-full gap-4 sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">내가 팔 때</span>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{sellPrice.toLocaleString()}</span>
              <span className="text-base font-normal text-white">원</span>
            </div>
            <div className="flex flex-col items-end">
              {/* <PriceChangeTag value={`${priceChange.toLocaleString()}`} percentage={`${percentChange}%`} /> */}
              {isSokeum && sellDifference > 0 && <PriceDifference difference={sellDifference} better={true} />}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">내가 살 때</span>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">{buyPrice.toLocaleString()}</span>
              <span className="text-base font-normal text-white">원</span>
            </div>
            <div className="flex flex-col items-end">
              {/* <PriceChangeTag value={`${priceChange.toLocaleString()}`} percentage={`${percentChange}%`} /> */}
              {isSokeum && buyDifference > 0 && <PriceDifference difference={buyDifference} better={false} />}
            </div>
          </div>
        </div>
      </div>

      {/* 태블릿 이상 뷰 - 가로 배열 */}
      <div className="hidden w-full sm:grid sm:grid-cols-2">
        {/* 내가 팔 때 */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-baseline gap-[3px]">
            <span
              className={`${
                isSokeum ? "text-base sm:text-xl md:text-2xl" : "text-xs sm:text-lg md:text-xl"
              } font-bold leading-[1.5em] text-center text-white`}
            >
              {sellPrice.toLocaleString()}
            </span>
            <span className="text-sm sm:text-base md:text-lg font-normal leading-[1.45em] text-center text-white">
              원
            </span>
          </div>
          <div className="flex flex-col items-center">
            {/* <PriceChangeTag value={`${priceChange.toLocaleString()}`} percentage={`${percentChange}%`} /> */}
            {<PriceDifference difference={sellDifference} better={true} />}
          </div>
        </div>

        {/* 내가 살 때 */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center items-baseline gap-[3px]">
            <span
              className={`${
                isSokeum ? "text-base sm:text-xl md:text-2xl" : "text-xs sm:text-lg md:text-xl"
              } font-bold leading-[1.5em] text-center text-white`}
            >
              {buyPrice.toLocaleString()}
            </span>
            <span className="text-sm sm:text-base md:text-lg font-normal leading-[1.45em] text-center text-white">
              원
            </span>
          </div>
          <div className="flex flex-col items-center">
            {/* <PriceChangeTag value={`${priceChange.toLocaleString()}`} percentage={`${percentChange}%`} /> */}
            {isSokeum && buyDifference > 0 && <PriceDifference difference={buyDifference} better={false} />}
          </div>
        </div>
      </div>
    </>
  );
};

// 가격 데이터를 외부에서 사용할 수 있도록 export
export const goldPriceData = {
  // 내가 팔 때 가격들
  sokeumSellPrice: 568390, // sokeum 내가 팔 때 가격
  koreaGoldSellPrice: 549000, // 한국금거래소 내가 팔 때 가격
  sGoldSellPrice: 550000, // S 금거래소 내가 팔 때 가격
  jongnoWholesaleSellPrice: 551000, // 종로 도매 평균가 내가 팔 때 가격

  // 내가 살 때 가격들
  sokeumBuyPrice: 571730, // sokeum 내가 살 때 가격
  koreaGoldBuyPrice: 665000, // 한국금거래소 내가 살 때 가격
  sGoldBuyPrice: 655000, // S 금거래소 내가 살 때 가격
  jongnoWholesaleBuyPrice: 613800, // 종로 도매 평균가 내가 살 때 가격

  // 가격 변동 정보
  priceChange: 1000, // 가격 변동 (원)
  percentChange: 0.46, // 변동률 (%)
};

const GoldPriceCard = () => {
  const {
    sokeumSellPrice,
    koreaGoldSellPrice,
    sGoldSellPrice,
    jongnoWholesaleSellPrice,
    sokeumBuyPrice,
    koreaGoldBuyPrice,
    sGoldBuyPrice,
    jongnoWholesaleBuyPrice,
    priceChange,
    percentChange,
  } = goldPriceData;

  // 다른 거래소들의 "내가 팔 때" 가격 중 최고가 찾기
  const otherSellPrices = [koreaGoldSellPrice, sGoldSellPrice, jongnoWholesaleSellPrice];
  const highestOtherSellPrice = Math.max(...otherSellPrices);
  const sellPriceDifference = sokeumSellPrice - highestOtherSellPrice;

  // 다른 거래소들의 "내가 살 때" 가격 중 최저가 찾기
  const otherBuyPrices = [koreaGoldBuyPrice, sGoldBuyPrice, jongnoWholesaleBuyPrice];
  const lowestOtherBuyPrice = Math.min(...otherBuyPrices);
  const buyPriceDifference = lowestOtherBuyPrice - sokeumBuyPrice;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full lg:min-w-[711px] lg:max-w-[711px]">
      <CardContainer className="flex flex-col items-end self-stretch gap-6 p-6 sm:gap-10 md:gap-16 sm:p-10 md:p-20">
        <div className="flex flex-col w-full gap-6 sm:gap-8">
          {/* 헤더 행 - 모바일에서는 숨김 */}
          <div className="hidden w-full sm:grid sm:grid-cols-3">
            <div className="col-span-1"></div>
            <div className="text-lg sm:text-xl md:text-2xl font-medium leading-[1.5em] text-center text-white">
              내가 팔 때
            </div>
            <div className="text-lg sm:text-xl md:text-2xl font-medium leading-[1.5em] text-center text-white">
              내가 살 때
            </div>
          </div>

          {/* 그리드 테이블 */}
          <div className="w-full">
            {/* sokeum 행 */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 p-4 sm:p-0 rounded-lg sm:rounded-none bg-[rgba(0,0,0,0.2)] sm:bg-transparent mb-4 sm:mb-8">
              <TraderLabel color="#D95204">
                <SokeumLogo size="small" className="text-xl md:text-3xl lg:text-3xl" />
              </TraderLabel>

              <div className="col-span-2 mt-4 sm:mt-0">
                <PriceInfo
                  sellPrice={sokeumSellPrice}
                  buyPrice={sokeumBuyPrice}
                  priceChange={priceChange}
                  percentChange={percentChange}
                  sellDifference={sellPriceDifference}
                  buyDifference={buyPriceDifference}
                  isSokeum={true}
                />
              </div>
            </div>

            {/* 한국금거래소 행 */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 p-4 sm:p-0 rounded-lg sm:rounded-none bg-[rgba(0,0,0,0.2)] sm:bg-transparent mb-4 sm:mb-8">
              <TraderLabel color="#FE5F01" name="한국금거래소" />
              <div className="col-span-2 mt-4 sm:mt-0">
                <PriceInfo
                  sellPrice={koreaGoldSellPrice}
                  buyPrice={koreaGoldBuyPrice}
                  priceChange={priceChange}
                  percentChange={percentChange}
                />
              </div>
            </div>

            {/* S 금거래소 행 */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 p-4 sm:p-0 rounded-lg sm:rounded-none bg-[rgba(0,0,0,0.2)] sm:bg-transparent mb-4 sm:mb-8">
              <TraderLabel color="#194585" name="S 금거래소" />
              <div className="col-span-2 mt-4 sm:mt-0">
                <PriceInfo
                  sellPrice={sGoldSellPrice}
                  buyPrice={sGoldBuyPrice}
                  priceChange={priceChange}
                  percentChange={percentChange}
                />
              </div>
            </div>

            {/* 종로 도매 평균가 행 */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 p-4 sm:p-0 rounded-lg sm:rounded-none bg-[rgba(0,0,0,0.2)] sm:bg-transparent mb-4 sm:mb-8">
              <TraderLabel color="#737373" name="종로 도매 평균가" />
              <div className="col-span-2 mt-4 sm:mt-0">
                <PriceInfo
                  sellPrice={jongnoWholesaleSellPrice}
                  buyPrice={jongnoWholesaleBuyPrice}
                  priceChange={priceChange}
                  percentChange={percentChange}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
      <div className="flex items-center self-stretch justify-center gap-2">
        <InfoIcon />
        <span className="text-sm sm:text-base md:text-xl font-normal leading-[1.5em] text-left text-[#737373]">
          {dayjs().format("YYYY.MM.DD HH:mm")} 실시간 업데이트 • 1돈 24K 기준
        </span>
      </div>
    </div>
  );
};

export default GoldPriceCard;
