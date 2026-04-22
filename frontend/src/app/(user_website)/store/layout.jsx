import TopBanner from "../components/store/TopBanner";
import PopularCategories from "../components/store/PopularCategories";
import Category from "../components/store/Category";
import { getBrands, getCategory, getColors } from "../../../../library/api_calls";
import BrandFilter from "../components/store/BrandFilter";
import PriceFilter from "../components/store/PriceFilter";
import ColorFillter from "../components/store/ColorFillter";

async function layout({ children }) {
  const Categories = await getCategory(null);
  const Brands = await getBrands(null);
  const Colors = await getColors(null);

  return (
    <section>
      <TopBanner />
      <PopularCategories Categories={Categories.data} />

      <main className="bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-6 my-4 flex flex-col lg:flex-row gap-6">
        <section className="flex flex-col gap-y-3 w-full lg:w-[302px]">
          <Category Categories={Categories.data} />

          <div className="flex flex-col gap-y-3 bg-[#EEEFF6] rounded-[10px] p-3 sm:p-5 md:p-6 w-full md:w-auto shadow-sm">
            <BrandFilter Brands={Brands.data} />
            <PriceFilter />
            <ColorFillter Colors={Colors} />
          </div>

          <div className="h-[180px] sm:h-[230px] md:h-[250px] lg:h-[300px] bg-[url('/slider/addimg.png')] bg-center bg-cover rounded-[10px] p-4 sm:p-6 md:p-8 flex flex-col justify-end sm:justify-between">
            <div>
              <h3 className="text-white text-base sm:text-lg md:text-xl lg:text-[24px] mb-2 sm:mb-4 leading-snug drop-shadow-md">
                OKODo hero 11+ <br /> 5K wireless
              </h3>
              <p className="text-[#cccccc] uppercase text-xs sm:text-sm">from</p>
              <p className="text-[#27FD27] text-lg sm:text-xl md:text-2xl lg:text-[30px] font-semibold drop-shadow-md">
                $169
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1">
          {children}
        </section>
      </main>
    </section>
  );
}

export default layout;
