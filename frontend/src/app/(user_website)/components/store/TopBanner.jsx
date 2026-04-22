import React from "react";
import ProductSlider from "./Sliders";

function TopBanner() {
  return (
    <main className="bg-white px-3 sm:px-4 py-5 sm:py-6 my-4">
      {/* Heading */}
      <h3 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold uppercase mb-4 sm:mb-5 text-center md:text-left tracking-wide">
        top cell phones & tablets
      </h3>

      {/* Banner Wrapper */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-center lg:items-stretch">
        {/* Left Banner */}
        <div className="w-full sm:w-[90%] md:w-[700px] lg:w-[800px] h-[180px] sm:h-[220px] md:h-[280px] lg:h-[310px] rounded-[10px] overflow-hidden shadow-sm">
          <ProductSlider
            img1={"/sliders/banner1.jpg"}
            img2={"/sliders/banner2.png"}
            img3={"sliders/banner3.jpg"}
          />
        </div>

        {/* Right Banner */}
        <div className="w-full  lg:flex-1 h-[180px] sm:h-[220px] md:h-[280px] lg:h-[310px] rounded-[10px] overflow-hidden shadow-sm">
          <ProductSlider
            img1={"/sliders/banner4.jpg"}
            img2={"/sliders/banner5.jpg"}
            img3={"sliders/banner6.jpg"}
          />
        </div>
      </div>
    </main>
  );
}

export default TopBanner;
