'use client'
import React, { useEffect, useState } from "react";
import HomeTab from "./HomeTab";
import Slider from "./Slider";
import Link from "next/link";

function DealsSec({ producte }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const randIndex = Math.floor(Math.random() * producte.length);
    setProduct(producte[randIndex]);
  }, [producte]);

  return (
    <div className="px-2 md:px-4 md:block flex flex-col gap-5 ">
      {/* Top Section: Deals + Side Slider */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left (Deal of the Day) */}
        <div className="flex-1 w-full lg:w-[900px]">
          <div className="bg-[#01A49E] uppercase text-white rounded-[10px] text-[16px] md:text-[18px] font-bold py-3 pl-4 md:pl-6">
            Deals of the day
          </div>

          {product ? (
            <div className="bg-white rounded-[10px] flex flex-col md:flex-row px-4 md:px-6 py-5 h-full">
              {/* Left: Product Images */}
              <div className="flex flex-col md:flex-row md:flex-1/2 p-3 md:p-5">
                <div className="flex md:flex-col gap-3 md:gap-y-5 justify-center md:justify-start">
                  {product?.images?.slice(0,3).map((img, i) => (
                    <img
                      key={i}
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                      width={60}
                      height={60}
                      className="rounded-[8px]"
                      alt={`${product?.name}-${i}`}
                    />
                  ))}
                </div>

                <div className="flex-1 flex flex-col justify-center items-center mt-4 md:mt-0">
                  <div className="flex justify-end w-full">
                    <div className="bg-[#EBEDF3] w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full"></div>
                  </div>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product?.thumbnail}`}
                    width={160}
                    height={160}
                    alt={product?.name}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right: Info */}
              <div className="flex-1/2 px-2 md:px-5 mt-4 md:mt-0 text-sm">
                <p className="text-[#666] text-center mb-1">
                  ({product?.colors?.length})
                </p>
                <h1 className="font-bold text-[15px] md:text-[16px] mb-2 text-center md:text-left">
                  {product?.name}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-2">
                  <h1 className="font-bold text-[#01A49E] text-[15px]">
                    ₹{product?.finalPrice?.toLocaleString()}
                  </h1>
                  <p className="line-through text-[#666666] text-[14px]">
                    ₹{product?.originalPrice?.toLocaleString()}
                  </p>
                </div>

                <p className="text-[12px] md:text-[13px] mb-3 text-center md:text-left">
                  {product?.shortDescription}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <div className="text-[#01A49E] bg-gray-200 text-[11px] py-1 px-3 rounded-[6px] font-bold uppercase">
                    free shipping
                  </div>
                  <div className="text-[#01A49E] bg-gray-200 text-[11px] py-1 px-3 rounded-[6px] font-bold uppercase">
                    free gift
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 py-3 border-b border-[#EBEDF3] text-center md:text-left">
                  <div className="text-xs md:text-sm font-bold">
                    Hurry up! Offer ends soon
                  </div>
                  <div className="flex justify-center md:justify-between gap-2 flex-wrap">
                    {["-01", "-12", "-45", "-09"].map((t, i) => (
                      <div
                        key={i}
                        className="w-[45px] h-[55px] md:w-[55px] md:h-[74px] bg-[#EBEDF3] rounded-[6px] flex justify-center items-center font-bold"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="my-4">
                  <div className="h-[8px] md:h-[10px] bg-[#E2E4EB] rounded-[10px] mb-2">
                    <div
                      className="bg-[#01A49E] h-full rounded-[10px]"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                  <p className="text-xs md:text-sm">
                    Sold: <span className="font-bold">26/75</span>
                  </p>
                </div>

                <div className="my-3 text-center md:text-left">
                  <Link href={`/product/${product._id}`}>
                    <button className="px-4 py-2 rounded-2xl bg-[#EBEDF3] border border-[#01A49E] text-[#01A49E] hover:bg-[#01A49E] hover:text-white transition-all duration-300 text-sm">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[10px] h-[200px] animate-pulse" />
          )}
        </div>

        {/* Right (Sliders) */}
        <div className="flex flex-col gap-3 w-full lg:w-[300px]">
          <Slider
            img1={'bg-[url("/homeimg/img15.png")]'}
            img2={'bg-[url("/homeimg/img16.png")]'}
            img3={'bg-[url("/homeimg/img17.png")]'}
          />
          <div className="md:block hidden">
          <Slider
            img1={'bg-[url("/homeimg/img17.png")]'}
            img2={'bg-[url("/homeimg/img15.png")]'}
            img3={'bg-[url("/homeimg/img16.png")]'}
          />
          </div>
          <div className="md:block hidden">
            <Slider
            img1={'bg-[url("/homeimg/img16.png")]'}
            img2={'bg-[url("/homeimg/img15.png")]'}
            img3={'bg-[url("/homeimg/img17.png")]'}
          />
          </div>
          
        </div>
      </div>

      {/* Middle Banner */}
      <div className="bg-[#01A49E] rounded-[20px] h-auto md:h-[140px] relative overflow-hidden text-white flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 px-4 md:px-10 md:py-0 py-6 ">
        <div className="absolute h-[400px] w-[400px] rounded-full bg-[#5F81A2] -z-0 left-0 top-0 opacity-40"></div>
        <div className="z-10 text-center md:text-left">
          <h1 className="uppercase font-bold text-[20px] md:text-[24px]">Pre Order</h1>
          <p className="text-[14px]">From $399</p>
        </div>

        <div className="h-[140px] w-full md:w-[386px] bg-[url('/homeimg/banner2.png')] bg-cover bg-center rounded-lg"></div>

        <div className="z-10 text-center md:text-right">
          <p className="text-[12px]">Opplo Watch Sport Series 8</p>
          <h1 className="text-[20px] md:text-[30px] font-bold">A healthy leap ahead</h1>
        </div>

        <div className="z-10">
          <Link href="/store">
            <button className="bg-white text-black py-2 px-5 rounded-full font-bold text-sm md:text-base">
              Discover Now
            </button>
          </Link>
        </div>
      </div>

      {/* Product Tabs */}
      <HomeTab products={producte} />
    </div>
  );
}

export default DealsSec;
