'use client'
import { useState } from "react"

function ChangeImages({ product }) {
    const [img,setImg]=useState(product.thumbnail)
    return (
        <div>
            <div className=" rounded-lg flex justify-center  mb-4 w-full h-[400px] overflow-hidden">
                <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img || product.thumbnail}`}
                    alt={product.name}
                    
                    className="object-cover h-full w-full rounded-2xl"
                />
            </div>
            <div className="grid grid-cols-4 gap-3 items-center ">
                {product.images?.map((img, i) => (
                    <img
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${img}`}
                        alt={`${product.name}-${i}`}
                        onMouseEnter={()=>setImg(img)}
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