import Image from "next/image";
import CardContainer from "../ui/CardContainer";

interface InfoCardProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText: string;
  link: string;
  isTel?: boolean;
}

const InfoCard = ({ imageSrc, title, subtitle, buttonText, link, isTel }: InfoCardProps) => {
  const buttonClass =
    "flex justify-center items-center self-stretch gap-2 px-4 py-2 sm:p-[20px] rounded-lg bg-gradient-to-b from-[rgba(255,255,255,0.16)] to-[rgba(255,255,255,0)] hover:from-[rgba(255,255,255,0.2)] hover:to-[rgba(255,255,255,0.05)] transition-colors duration-200 text-lg sm:text-xl md:text-2xl font-semibold leading-[1.5em] text-center text-white";

  const linkProps = isTel ? { href: `tel:${link}` } : { href: link, target: "_blank", rel: "noopener noreferrer" }; // 새 탭에서 열기

  return (
    <CardContainer className="flex flex-col items-center justify-between gap-6 p-6 sm:p-8 md:p-10 flex-1">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <Image src={imageSrc} alt={title} layout="fill" objectFit="contain" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.5em] text-center text-white">
            {title}
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-normal leading-[1.5em] text-center text-white">
            {subtitle}
          </span>
        </div>
      </div>
      <a {...linkProps} className={buttonClass}>
        {buttonText}
      </a>
    </CardContainer>
  );
};

export default InfoCard;
