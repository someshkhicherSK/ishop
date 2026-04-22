"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductSlider({img1,img2,img3}) {
  return (
    <div className="w-full  h-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        height={100}
        className=" h-full w-full"
      >
       
        <SwiperSlide className="h-full">
          <img className="h-full w-full object-cover" src={img1}  alt="Product 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-full w-full object-cover" src={img2} alt="Product 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="h-full w-full object-cover" src={img3} alt="Product 4" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
