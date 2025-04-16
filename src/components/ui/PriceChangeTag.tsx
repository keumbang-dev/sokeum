interface PriceChangeTagProps {
  value: string;
  percentage: string;
}

const PriceChangeTag = ({ value, percentage }: PriceChangeTagProps) => {
  const isUp = percentage.startsWith("-") ? false : true;
  const color = isUp ? "text-[#DC2626]" : "text-[#25AFFE]";
  const polygonPath = isUp
    ? "M12 4L4 12H20L12 4Z" // 상승 삼각형
    : "M12 20L4 12H20L12 20Z"; // 하락 삼각형

  return (
    <div className={`flex justify-center items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full ${color}`}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill={isUp ? "#DC2626" : "#25AFFE"}
        xmlns="http://www.w3.org/2000/svg"
        className="sm:w-4 sm:h-4"
      >
        <path d={polygonPath} />
      </svg>
      <span className="text-sm sm:text-sm font-normal leading-[1.45em] text-left">{value}</span>
      <span className="text-sm sm:text-sm font-normal leading-[1.45em] text-left">({percentage})</span>
    </div>
  );
};

export default PriceChangeTag;
