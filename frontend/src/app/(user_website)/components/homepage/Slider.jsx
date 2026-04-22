"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


function Slider({img1,img2,img3}) {
    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                loop={true}
                height={100}
            >

                <SwiperSlide>
                    <div className={`rounded-[10px] ${img1} bg-cover bg-center h-[300px] md:h-[160px] `}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`rounded-[10px] ${img2} bg-cover bg-center h-[300px] md:h-[160px] `}></div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`rounded-[10px] ${img3} bg-cover bg-center h-[300px] md:h-[160px] `}></div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slider