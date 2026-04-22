"use client";

import { addTocart } from "@/app/redux/features/cartSlice";
import { Axiosinstance } from "@/app/utils/helper";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


export default function CartBtn({ productId, originalPrice, finalPrice,w,h }) {
    const dispatcher = useDispatch();
    const user = useSelector((state) => state.user.userDetails)

    const addToCart = () => {
        if (user != null) {
            Axiosinstance.post('/cart/add-to-cart', {
                productId,
                userId: user?._id
            }).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
                toast.info(error.response.data.msg)

            })
        }
        dispatcher(addTocart({ productId, originalPrice, finalPrice }))
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <button onClick={addToCart} className={`${w?"w-full":""} ${h?"h-full":""}  relative cursor-pointer   items-center justify-start inline-block px-5 py-1 overflow-hidden font-medium transition-all bg-[#1ABA1A] rounded-[7px] hover:bg-white group`}>
            <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#1ABA1A]">Add To Cart</span>
        </button>
    );
}
