import FooterContactInfo from "./FooterContactInfo";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center self-stretch gap-6 sm:gap-10 md:gap-16 p-6 sm:p-10 md:p-20 bg-[rgba(0,0,0,0.16)] border-t border-transparent border-gradient-to-r from-transparent via-white to-transparent">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center self-stretch gap-8 md:gap-16 w-full">
        <p className="text-sm sm:text-base md:text-lg font-normal leading-[1.8em] md:leading-[2em] text-left text-white opacity-80 md:max-w-[60%]">
          상호명: 금방(주) | 대표자: 임진리 <br />
          사업자등록번호: 689-87-01235 | 통신판매업신고번호: 2019-서울종로-0885 <br />
          주소: 서울특별시 종로구 종로 122 (종로3가, 골드센터) <br />© 2025 Keumbang, Inc. All rights reserved.
        </p>
        <FooterContactInfo />
      </div>
    </footer>
  );
};

export default Footer;
