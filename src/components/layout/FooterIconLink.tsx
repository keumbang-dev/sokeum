import Image from "next/image";
import React from "react";

interface FooterIconLinkProps {
  href: string;
  icon: string;
}

const FooterIconLink = ({ href, icon }: FooterIconLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
      <Image src={icon} alt="icon" width={18} height={18} />
    </a>
  );
};

export default FooterIconLink;
