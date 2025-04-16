import FooterIconLink from "./FooterIconLink";

const FooterContactInfo = () => {
  return (
    <div className="flex flex-col justify-between gap-4 h-auto md:h-[140px]">
      <div className="flex flex-row items-center gap-2 sm:gap-4 h-auto md:h-[140px] text-xs sm:text-sm md:text-lg font-normal leading-[1.5em] sm:leading-[1.8em] md:leading-[2em] text-right">
        <FooterIconLink href="tel:02-2272-9897" icon="/images/phone-call.png" />
        고객센터: 02-2272-9897
      </div>
      <div className="flex flex-row items-center gap-2 sm:gap-4 h-auto md:h-[140px] text-xs sm:text-sm md:text-lg font-normal leading-[1.5em] sm:leading-[1.8em] md:leading-[2em] text-right">
        <FooterIconLink href="mailto:info@keumbang.com" icon="/images/mail.png" />
        이메일: info@keumbang.com
      </div>
      <div className="flex flex-row items-center gap-2 sm:gap-4 h-auto md:h-[140px] text-xs sm:text-sm md:text-lg font-normal leading-[1.5em] sm:leading-[1.8em] md:leading-[2em] text-right">
        <FooterIconLink href="https://www.instagram.com/sokeum_official/" icon="/images/instagram.png" />
        인스타그램: @sokeum_official
      </div>
    </div>
  );
};

export default FooterContactInfo;
