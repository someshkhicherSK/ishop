import Link from "next/link";
import HomeSlider from "./HomeSlider";

function TopMain({ Categories }) {
  return (
    <div className="flex flex-col md:flex-row gap-x-5 gap-y-1 my-2 px-2 md:px-4">
      {/* Category Sidebar */}
      <div className="p-4 w-full md:w-[298px] bg-white rounded-[15px] order-2 md:order-1 mt-4 md:mt-0">
        <h1 className="border-b border-[#ECECEC] py-2 mb-4 font-bold text-[20px] md:text-[24px]">
          Category
        </h1>
        <ul className="flex flex-col gap-y-3 px-1 md:px-2">
          {Categories?.slice(0, 5)?.map((Category) => (
            <Link key={Category._id} href={`/store/${Category.slug}`}>
              <li className="flex items-center justify-between p-3 border border-[#F2F3F4] rounded-[7px] transition-all duration-300 capitalize hover:bg-[#01A49E] hover:text-white text-sm md:text-base">
                <div className="flex items-center gap-x-2 font-bold">
                  {Category.name}
                </div>
                <span className="w-[20px] h-[20px] flex justify-center items-center bg-[#01A49E] rounded-full text-white text-[12px]">
                  {Category.productCount}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Slider Section */}
      <div className="flex-1 rounded-[20px] md:rounded-[30px] h-[250px] md:h-[380px] overflow-hidden order-1 md:order-2">
        <HomeSlider />
      </div>
    </div>
  );
}

export default TopMain;
