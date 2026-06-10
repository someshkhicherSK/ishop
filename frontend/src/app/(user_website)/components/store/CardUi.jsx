"use client";

import { FaHeart } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import CartBtn from "../CartBtn";
import Link from "next/link";
import { getImageUrl } from "@/app/utils/helper";

function CardUi({ item }) {
  const { _id, finalPrice, originalPrice } = item;
  const productUrl = `/product/${_id}`;

  return (
    <div className="relative my-6 border-gray-200 border rounded-[7px]">
      <Link href={productUrl} className="block">
        <div className="relative">
          <div className="absolute px-3 top-3 left-0 w-full z-10 flex items-center justify-between pointer-events-none">
            {item.discountPercentage ? (
              <div className="bg-[#1ABA1A] rounded-[7px] h-[41px] w-[73px] flex flex-col justify-center items-center text-white">
                <div>
                  <p className="uppercase text-[10px]">save</p>
                  <h3 className="font-semibold text-[14px]">{item?.discountPercentage}</h3>
                </div>
              </div>
            ) : null}
            <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#E2E4EB] ml-auto">
              <FaHeart fill="#F1352B" />
            </div>
          </div>

          <div className="h-[195px] border-gray-200 border-b flex items-center justify-center overflow-hidden">
            <img
              src={getImageUrl(item.thumbnail, "product")}
              width={130}
              height={100}
              alt={item.name}
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between px-2 pt-2">
          <p className="text-[#666666] text-center my-2 font-semibold">
            {item?.count}
          </p>
          <h3 className="font-bold text-[12px] mb-2 line-clamp-2">
            {item.name}
          </h3>

          <div className="flex items-center gap-x-2 mb-4">
            <h3 className="text-[#F1352B] font-bold">₹ {item.finalPrice}</h3>
            <h5 className="line-through font-semibold text-[#666666]">
              ₹ {item.originalPrice}
            </h5>
          </div>

          <div className="flex gap-x-2 items-center mb-4">
            {item?.colors?.map((clr) => (
              <div
                key={clr._id}
                style={{ backgroundColor: clr.hexacode }}
                className="w-[20px] h-[20px] rounded-full shadow"
              />
            ))}
          </div>

          <div className="text-[12px] capitalize flex gap-x-1 items-center font-bold mb-2">
            {item.stock === "In stock" || item.stock === true ? (
              <>
                <IoIosCheckmarkCircle fill="#1ABA1A" className="text-xl" /> In stock
              </>
            ) : (
              <>
                <FcCancel fill="#F1352B" className="text-xl" /> Out of stock
              </>
            )}
          </div>
        </div>
      </Link>

      <div className="px-2 pb-4">
        <CartBtn
          productId={_id}
          finalPrice={finalPrice}
          originalPrice={originalPrice}
        />
      </div>
    </div>
  );
}

export default CardUi;
