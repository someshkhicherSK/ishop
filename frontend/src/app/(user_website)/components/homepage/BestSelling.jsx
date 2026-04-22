import CardUi from "../store/CardUi";
import Link from "next/link";
import NoProductFound from "../store/NoProductFound";

const product = [
  { img: "/product/prod19.png", brands: "iPhone (ios)", items: 74 },
  { img: "/product/prod20.png", brands: "Android", items: 35 },
  { img: "/product/prod21.png", brands: "5G Support", items: 12 },
  { img: "/product/prod22.png", brands: "Apple Tablets", items: 22 },
  { img: "/product/prod23.png", brands: "Smartphone Chargers", items: 33 },
  { img: "/product/prod24.png", brands: "Gaming", items: 9 },
];

function BestSelling({ products }) {
  return (
    <main className="bg-white px-2 md:px-4 py-6 my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center px-3 md:px-6 mb-5 text-center md:text-left">
        <h3 className="text-[16px] md:text-[18px] font-bold uppercase">
          Best Laptops & Computers
        </h3>

        <div className="text-[12px] md:text-[13px] uppercase text-[#666] mt-2 md:mt-0">
          <Link href="/store">view all</Link>
        </div>
      </div>

      {/* Banner Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-3 px-3 md:px-6 border-b border-slate-200 pb-5">
        {/* Left Banner */}
        <div className='h-[180px] sm:h-[220px] md:h-[280px] lg:h-[200px] bg-[url("/slider/imagebest.png")] rounded-[10px] bg-cover bg-center text-white px-5 md:px-10 py-4 md:py-5 flex flex-col justify-center'>
          <h1 className="text-[20px] sm:text-[22px] md:text-[28px] lg:text-[30px] font-bold text-white uppercase max-w-[240px] leading-7 sm:leading-8 md:leading-9">
            Mobok 2 superchard
            <p className="font-normal">by M2</p>
          </h1>

          <p className="text-[11px] sm:text-[13px] md:text-[18px] text-[#ddd] mt-2">
            Start from{" "}
            <span className="text-green-400 font-semibold">$1,199</span>
          </p>
        </div>

        {/* Right Banner */}
        <div className="rounded-[10px] grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-6 justify-items-center">
          {product.map((pro, index) => (
            <Link key={index + 1} href={"/store"}>
              <div className="flex items-center gap-x-2 sm:gap-x-4 md:gap-x-6 justify-center">
                <img
                  src={pro.img}
                  width={40}
                  height={40}
                  alt={pro.brands}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-semibold capitalize text-[12px] sm:text-[13px] md:text-[14px]">
                    {pro.brands}
                  </h3>
                  <p className="text-[#666] text-[10px] sm:text-[11px] md:text-[12px]">
                    {pro.items} items
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-x-3 px-3 md:px-6 mt-5">
        {(() => {
          const filtered =
            products?.filter((p) =>
              ["laptops", "tablets", "smartphones"].includes(
                p.categoryId?.name?.toLowerCase()
              )
            ) || [];

          if (filtered.length === 0) {
            return (
              <div className="col-span-full">
                <NoProductFound />
              </div>
            );
          }

          const dummyCount = 5 - filtered.length;
          const dummyArray = Array.from({ length: dummyCount });

          return (
            <>
              {filtered.map((item, index) => (
                <CardUi item={item} key={`real-${index}`} />
              ))}

              {dummyArray.map((_, i) => (
                <div
                  key={`dummy-${i}`}
                  className="relative my-6 border-gray-200 border rounded-[7px]"
                ></div>
              ))}
            </>
          );
        })()}
      </div>
    </main>
  );
}

export default BestSelling;
