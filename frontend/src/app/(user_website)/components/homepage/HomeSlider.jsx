"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaTelegram } from "react-icons/fa";

function HomeSlider() {
    return (
        <div className="w-full h-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-full"
            >
                {["/slider/banner1.jpg", "/slider/banner2.jpg", "/slider/banner3.jpg"].map(
                    (img, i) => (
                        <SwiperSlide key={i} className="h-full">
                            <div
                                style={{
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className="rounded-[20px] md:rounded-[30px] flex-1 py-3"
                            >
                                <div className="px-4 sm:px-8 md:px-16 py-6 md:py-10 text-white">
                                    <h1 className="mb-4 md:mb-6 text-[28px] sm:text-[40px] md:text-[72px] font-bold leading-[1.2] md:leading-[1.1]">
                                        Don’t miss amazing grocery deals
                                    </h1>
                                    <p className="mb-4 text-[16px] sm:text-[20px] md:text-[30px] font-semibold">
                                        Sign up for the daily newsletter
                                    </p>
                                    <div className="border-[#9A9A9A] border items-stretch sm:items-center pl-4 sm:pl-5 gap-3 sm:gap-x-4 text-[14px] sm:text-[16px] rounded-[30px] md:rounded-[50px] mt-4 overflow-hidden text-white inline-flex ">
                                        <div className="flex items-center gap-x-3">
                                            <FaTelegram fill="#fff" />
                                            <span>Your email address</span>
                                        </div>
                                        <button className="bg-[#01A49E] px-5 py-2 sm:px-6 sm:py-3 rounded-[30px] md:rounded-[50px] text-sm sm:text-base">
                                            Subscribe
                                        </button>
                                    </div>

                                    
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                )}

            </Swiper>
        </div>
    );
}

export default HomeSlider;
