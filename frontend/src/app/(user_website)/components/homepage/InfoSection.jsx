import Link from "next/link";

const product = [
  { img: "/product/prod19.png", brands: "iPhone (ios)", items: 74 },
  { img: "/product/prod20.png", brands: "Android", items: 35 },
  { img: "/product/prod21.png", brands: "5G Support", items: 12 },
  { img: "/product/prod22.png", brands: "Apple Tablets", items: 22 },
  { img: "/product/prod23.png", brands: "Smartphone Chargers", items: 33 },
  { img: "/product/prod24.png", brands: "Gaming", items: 9 },
  { img: "/product/prod25.png", brands: "Xiaomi", items: 52 },
  { img: "/product/prod26.png", brands: "Accessories", items: 18 },
  { img: "/product/prod27.png", brands: "Samsung Tablets", items: 16 },
  { img: "/product/prod28.png", brands: "eReader", items: 51 },
  { img: "/product/prod23.png", brands: "Smartphone Chargers", items: 33 },
  { img: "/product/prod24.png", brands: "Gaming", items: 9 },
];

function InfoSection() {
  return (
    <div className="px-3 md:px-4 py-6 my-4">
      {/* Grid Responsive: Desktop 3 cols → Mobile 1 col */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-5">
        {/* Reusable card block (Audio & Cameras, Gaming, Office Equipments) */}
        {/* 1️⃣ Audios & Cameras */}
        <div className="bg-white p-4 sm:p-5 rounded-[10px]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-2">
            <h3 className="text-[16px] md:text-[18px] font-bold uppercase text-center sm:text-left">
              Audios & Cameras
            </h3>
            <div className="text-[12px] md:text-[13px] uppercase text-[#666666] text-center sm:text-right">
              <Link href={"/store"}>view all</Link>
            </div>
          </div>

          <div className='my-3 p-6 h-[160px] sm:h-[190px] bg-[url("/homeimg/img18.png")] rounded-[10px] bg-center bg-cover flex items-end'>
            <h1 className="text-[14px] font-bold text-white leading-5">
              Best Speaker 2023
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.slice(8, 10).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {product.slice(10, 12).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2️⃣ Gaming */}
        <div className="bg-white p-4 sm:p-5 rounded-[10px]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-2">
            <h3 className="text-[16px] md:text-[18px] font-bold uppercase text-center sm:text-left">
              Gaming
            </h3>
            <div className="text-[12px] md:text-[13px] uppercase text-[#666666] text-center sm:text-right">
              <Link href={"/store"}>view all</Link>
            </div>
          </div>

          <div className='my-3 p-5 sm:p-7 pb-5 h-[160px] sm:h-[190px] bg-[url("/homeimg/img19.png")] rounded-[10px] bg-center bg-cover flex items-end'>
            <h1 className="text-[14px] uppercase max-w-[120px] font-bold text-black leading-5">
              Wireless RGB Gaming Mouse
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.slice(0, 2).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {product.slice(2, 4).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3️⃣ Office Equipments */}
        <div className="bg-white p-4 sm:p-5 rounded-[10px]">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-y-2">
            <h3 className="text-[16px] md:text-[18px] font-bold uppercase text-center sm:text-left">
              Office Equipments
            </h3>
            <div className="text-[12px] md:text-[13px] uppercase text-[#666666] text-center sm:text-right">
              <Link href={"/store"}>view all</Link>
            </div>
          </div>

          <div className='my-3 h-[160px] sm:h-[190px] bg-[url("/homeimg/img20.png")] rounded-[10px] bg-center bg-cover flex flex-col justify-center items-center'>
            <p className="text-center text-[10px] text-[#CCCCCC]">
              Home Thearther 4k
            </p>
            <h1 className="text-[20px] sm:text-[24px] text-center font-bold text-white">
              Laser Projector
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {product.slice(4, 6).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            {product.slice(6, 8).map((item, index) => (
              <Link href={"/store"} key={index}>
                <div className="flex flex-col items-center">
                  <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] rounded-full flex justify-center items-center">
                    <img
                      src={item.img}
                      alt={`image${index}`}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center mt-1">
                    <h1 className="font-bold text-[13px] sm:text-[14px]">{item.brands}</h1>
                    <p className="text-[#666666] text-[10px]">{item.items}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
