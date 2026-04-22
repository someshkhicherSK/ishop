'use client'

import { formatCurrencyINR } from "@/app/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Search() {
  const [category, setCatgory] = useState();
  const router = useRouter()
  const sumithandler = () => {
    if (category) {
      router.push(`/store/${category}`)
    } else {

      alert("Enter The Name...")
    }
  }

  return (
    <div className="bg-[#01A49E]  py-2">
      <div className="flex flex-col md:flex-row items-center justify-between text-white px-4 gap-y-3 md:gap-x-5">

        {/* Search Box */}
        <div className="flex w-full md:flex-1 rounded-[30px] overflow-hidden">
          <label
            htmlFor="search-dropdown"
            className="sr-only"
          >
            Search
          </label>
          <button
            id="dropdown-button"
            className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-[12px] font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200"
            type="button"
          >
            All categories
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div className="relative w-full">
            <input
              type="search"
              onChange={(e) => setCatgory(e.target.value)}
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm outline-0 text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search anything..."
              required
            />
            <button
              type="submit"
              onClick={sumithandler}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>

        {/* Extra Info */}
        <div className="flex  md:flex-row justify-between w-full md:w-auto px-2 md:px-5 uppercase md:text-[12px] text-[10px]  text-center md:text-left gap-y-1 md:gap-x-5">
          <div>free shipping over {formatCurrencyINR(199)}</div>
          <div>30 days money back</div>
          <div>100% secure payment</div>
        </div>
      </div>
    </div>
  );
}

export default Search;
