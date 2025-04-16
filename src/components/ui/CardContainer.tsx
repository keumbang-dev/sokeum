import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
  flex?: boolean;
}

const CardContainer = ({ children, className = "", flex = true }: CardContainerProps) => {
  const paddingRegex =
    /\bp-\[[^\]]+\]|\bp-\d+|\bp[xytblr]?-\d+|\bpx-\d+|\bpy-\d+|\bp[xytblr]?-\[[^\]]+\]|\bsm:p|\bmd:p|\blg:p/;
  const widthRegex = /\bw-\[[^\]]+\]|\bw-\d+|\bw[xytblr]?-\d+|\bw[xytblr]?-\[[^\]]+\]|\bsm:w|\bmd:w|\blg:w/;
  const heightRegex = /\bh-\[[^\]]+\]|\bh-\d+|\bh[xytblr]?-\d+|\bh[xytblr]?-\[[^\]]+\]|\bsm:h|\bmd:h|\blg:h/;
  const defaultPadding = paddingRegex.test(className) ? "" : "p-6 sm:p-10 md:p-20 lg:p-[80px]";
  const defaultWidth = widthRegex.test(className) ? "" : "w-full";
  const defaultHeight = heightRegex.test(className) ? "" : "h-full";
  return (
    <div
      className={`
        relative flex flex-row items-center ${defaultPadding}
        ${flex ? "flex-1" : ""}        
        rounded-[16px] overflow-hidden
      `}
      style={{
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.16) 0%, rgba(255, 255, 255, 0.16) 100%)",
      }}
    >
      {/* 그라데이션 테두리 - 수정된 방식 */}
      <div
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
          borderRadius: "16px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className={`relative z-[1] ${defaultWidth} ${defaultHeight} ${className}`}>{children}</div>
    </div>
  );
};

export default CardContainer;
