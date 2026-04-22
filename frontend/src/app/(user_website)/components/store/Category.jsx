"use client";
import Link from "next/link";
import { useState } from "react";

function Category({ Categories }) {
  const [limit, setlimit] = useState(10);

  return (
    <div className="flex flex-col gap-y-3 bg-[#EEEFF6] rounded-[10px] p-3 sm:p-4 md:p-6 w-full md:w-auto shadow-sm">
      {/* Title */}
      <h1 className="text-[15px] sm:text-[16px] md:text-[18px] font-bold uppercase text-center md:text-left tracking-wide">
        categories
      </h1>

      {/* All Categories Button */}
      <div className="flex justify-center md:justify-start mt-1">
        <Link href={`/store`}>
          <button className="relative cursor-pointer inline-flex items-center justify-center sm:justify-start px-4 sm:px-6 py-1.5 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group w-full sm:w-auto text-sm sm:text-[15px]">
            <span className="w-40 h-40 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-8 ml-8 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center sm:text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              All Categories
            </span>
          </button>
        </Link>
      </div>

      {/* Category List */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-x-3 sm:gap-x-4 md:gap-x-0 gap-y-2 sm:gap-y-3 text-center md:text-left mt-2">
        {Categories?.slice(0, limit)?.map((Category) => (
          <Link key={Category._id} href={`/store/${Category.slug}`}>
            <li className="text-[12px] sm:text-[13px] md:text-[14px] flex justify-between items-center my-1 bg-white font-semibold py-2 px-3 sm:px-4 md:px-5 rounded-[8px] cursor-pointer hover:bg-[#1ABA1A] hover:text-white transition-all duration-300 shadow-sm active:scale-[0.98]">
              <h3 className="truncate">{Category.name}</h3>
              <p className="text-[#636363] group-hover:text-white">( {Category.productCount} )</p>
            </li>
          </Link>
        ))}
      </ul>

      {/* View All / Show Less Button */}
      <div className="flex justify-center md:justify-start mt-3">
        {limit === 10 ? (
          <button
            onClick={() => setlimit(Infinity)}
            className="relative cursor-pointer inline-flex items-center justify-center sm:justify-start px-4 sm:px-6 py-1.5 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group w-full sm:w-auto text-sm sm:text-[15px]"
          >
            <span className="w-40 h-40 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-8 ml-8 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center sm:text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              View All
            </span>
          </button>
        ) : (
          <button
            onClick={() => setlimit(10)}
            className="relative cursor-pointer inline-flex items-center justify-center sm:justify-start px-4 sm:px-6 py-1.5 overflow-hidden font-medium transition-all bg-white rounded-md hover:bg-white group w-full sm:w-auto text-sm sm:text-[15px]"
          >
            <span className="w-40 h-40 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-8 ml-8 group-hover:ml-0 group-hover:mb-28 group-hover:translate-x-0"></span>
            <span className="relative w-full text-center sm:text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
              Show Less
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Category;
