'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function ColorFillter({Colors}) {
    const router = useRouter()
      const [selclr, setSelClr] = useState(null);
      useEffect(() => {
        const color = new URLSearchParams({ color: selclr });
        if (selclr) {
          router.push(`?${color.toString()}`);
        }
      }, [selclr])
  return (
     <div className="mb-2 border-b border-gray-300 pb-5">
        <h3 className="mb-3 font-bold text-[14px] md:text-[16px]">By Color</h3>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-5 gap-x-2 gap-y-3">
          {Colors.map(
            (clr) => (
              <div
                onClick={()=>{setSelClr(clr.slug)}}
                key={clr._id}
                className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] cursor-pointer rounded-[5px]"
                style={{ background: clr.hexacode }}
              ></div>
            )
          )}
        </div>
      </div>
  )
}

export default ColorFillter