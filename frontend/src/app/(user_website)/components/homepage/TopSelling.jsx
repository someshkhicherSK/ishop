import CardUi from "../store/CardUi";
import Link from "next/link";

const product = [
  { img: "/product/prod19.png", brands: "iPhone (ios)", items: 74 },
  { img: "/product/prod20.png", brands: "Android", items: 35 },
  { img: "/product/prod21.png", brands: "5G Support", items: 12 },
  { img: "/product/prod22.png", brands: "Apple Tablets", items: 22 },
  { img: "/product/prod23.png", brands: "Smartphone Chargers", items: 33 },
  { img: "/product/prod24.png", brands: "Gaming", items: 9 },
];

function TopSelling({ products }) {
  return (
    <main className="bg-white px-2 md:px-4 py-6 my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center px-3 md:px-6 mb-5 text-center md:text-left">
        <h3 className="text-[16px] md:text-[18px] font-bold uppercase">
          top cell phones & tablets
        </h3>

        <div className="text-[12px] md:text-[13px] uppercase text-[#666] mt-2 md:mt-0">
          <Link href="/store">view all</Link>
        </div>
      </div>

      {/* Banner Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-3 px-3 md:px-6 border-b border-slate-200 pb-5">
        {/* Left Banner */}
        <div className='h-[180px] sm:h-[220px] md:h-[280px] lg:h-[200px] bg-[url("/slider/div.png")] rounded-[10px] bg-cover bg-center text-white px-5 md:px-10 py-4 md:py-5 flex flex-col justify-center'>
          <h1 className="text-[20px] sm:text-[22px] md:text-[28px] lg:text-[30px] font-bold text-black uppercase max-w-[240px] leading-7 sm:leading-8 md:leading-9">
            redmi note 12 pro+ 5G
          </h1>
          <p className="text-[11px] sm:text-[13px] md:text-[18px] text-[#666] mb-3">
            Rise to the challenge
          </p>

          <Link href="/store">
            <button className="text-white bg-black py-2 px-4 rounded-[10px] text-sm md:text-base font-semibold hover:bg-[#01A49E] transition">
              SHOP NOW
            </button>
          </Link>
        </div>

        {/* Right Banner */}
        <div className="rounded-[10px] grid grid-cols-2 sm:grid-cols-3 gap-y-4 sm:gap-y-6 justify-items-center">
          {product.map((pro, index) => (
            <div
              className="flex items-center gap-x-2 sm:gap-x-4 md:gap-x-6"
              key={index + 1}
            >
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
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-x-3 px-3 md:px-6 mt-5">
        {products
          ?.filter((p) => p.topSelling === true)
          .map((item, index) => (
            <CardUi item={item} key={index + 1} />
          ))}
      </div>
    </main>
  );
}

export default TopSelling;
