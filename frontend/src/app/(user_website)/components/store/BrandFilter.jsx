'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BrandFilter({ Brands }) {
    const [limit, setlimit] = useState(7)
    const router = useRouter()
    const [selBrand, setSelBrand] = useState(null);
    useEffect(() => {
        const brand = new URLSearchParams({ brand: selBrand });
        if (selBrand) {
            router.push(`?${brand.toString()}`);

        }
    }, [selBrand])

    return (
        <div className="mb-2 border-b border-gray-300 pb-5">
            <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Brands</h3>
            <div>
                {Brands?.slice(0,limit)?.map((item) => (
                    <div key={item._id} className="mb-1 flex justify-between items-center">
                        <label onClick={() => setSelBrand(item.slug)} className="inline-flex items-center gap-x-2 my-1">
                            <input type="radio" name="brand" />
                            <div className=" rounded-[5px] py-[1px] px-2">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${item.logo}`}
                                    alt={item.name}
                                    width={30}
                                    height={20}
                                />
                            </div>
                            <p className="text-[#686868] text-[18px] font-semibold md:text-sm">{item.name}</p>
                            <p className="text-[#636363]">( {item.productCount} )</p>
                        </label>
                    </div>
                ))}
            </div>
            <div className="flex ">
                {
                    limit == 7 ?
                        <button onClick={() => setlimit(Infinity)} className="relative cursor-pointer inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">View All</span>
                        </button>
                        :
                        <button onClick={() => setlimit(7)} className="relative cursor-pointer inline-flex items-center justify-start px-6 py-1 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1ABA1A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Show Less</span>
                        </button>
                }

            </div>
        </div>
    )
}

export default BrandFilter