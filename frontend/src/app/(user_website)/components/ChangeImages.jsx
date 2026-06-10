'use client'
import { useState } from "react"
import { getImageUrl } from "@/app/utils/helper"

function ChangeImages({ product }) {
    const [img, setImg] = useState(() => getImageUrl(product.thumbnail, "product"))

    return (
        <div>
            <div className=" rounded-lg flex justify-center  mb-4 w-full h-[400px] overflow-hidden">
                <img
                    src={img || getImageUrl(product.thumbnail, "product")}
                    alt={product.name}
                    className="object-cover h-full w-full rounded-2xl"
                />
            </div>
            <div className="grid grid-cols-4 gap-3 items-center ">
                {product.images?.map((image, i) => (
                    <img
                        key={i}
                        src={getImageUrl(image, "product")}
                        alt={`${product.name}-${i}`}
                        onMouseEnter={() => setImg(getImageUrl(image, "product"))}
                        width={80}
                        height={80}
                        className=" border  border-gray-100 rounded-2xl cursor-pointer hover:scale-105 transition"
                    />
                ))}
            </div>
        </div>
    )
}

export default ChangeImages
