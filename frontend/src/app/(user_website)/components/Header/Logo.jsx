import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div className="flex justify-center md:justify-start">
      <Image
        src="/ishop_logo.png"
        width={162}
        height={40}
        priority
        alt="logo"
        className="w-[120px] md:w-[162px] h-auto"
      />
    </div>
  );
}

export default Logo;
