'use client'

import { addQnty, removeTocart } from "@/app/redux/features/cartSlice";
import { Axiosinstance, formatCurrencyINR } from "@/app/utils/helper";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NoProductFound from "./store/NoProductFound";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";


function CartItems({ product }) {
    const dispatcher = useDispatch()
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails)
    const cart = useSelector((state) => state.cart);
    const { items } = cart
    const cartprod = cart.items.map((item) => {
        return product.find((prod) => prod._id === item.productId)
    })




    const clickHandel = () => {
        if (cart?.finalPrice_Total == 0 || cart?.items.length == 0) {
            router.push('/store')
            return toast.info("Please Add Item then order...");
        }
        if (user) {
            router.push('checkout')
        } else {
            router.push('user-login?rfe=/checkout')
        }
    }
    const payloadSend = (flag, product) => {
        if (user != null) {
            Axiosinstance.patch(`/cart/qnty-manage/${user._id}/${product._id}/${flag}`).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        dispatcher(addQnty({ product, flag }))
    }

    const removehandel = (product) => {
        if (user != null) {
            Axiosinstance.delete(`/cart/remove-to-cart/${user._id}/${product._id}`).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        dispatcher(removeTocart({ product }))
        window.scrollTo({ top: 0, behavior: "smooth" });

    }
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 flex flex-col lg:flex-row gap-6">

            {/* Left Side - Cart Items */}
            {
                cart?.items.length > 0 ? (
                    <div className="flex-1 space-y-4 md:space-y-6">
                        {cartprod.map((product) => (
                            <div
                                key={product._id}
                                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                            >
                                <Link href={`/product/${product._id}`} className="flex-shrink-0">
                                    <div className="relative">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${product?.thumbnail}`}
                                            alt={product?.name}
                                            className="w-28 h-28 sm:w-24 sm:h-24 rounded-md object-cover mx-auto sm:mx-0"
                                        />
                                        <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded">
                                            SAVE ${product.discountPercentage}
                                        </span>
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <Link href={`/product/${product._id}`}>
                                        <h2 className="text-[14px] sm:text-sm font-semibold">{product.name}</h2>
                                        <h4 className="text-xs sm:text-sm text-gray-500 line-clamp-1 max-w-full sm:max-w-[80%] mx-auto sm:mx-0">
                                            {product.shortDescription}
                                        </h4>
                                        <p className="text-red-500 font-bold text-base sm:text-lg mt-1">
                                            {formatCurrencyINR(
                                                (items.find((item) => item.productId === product._id)?.qnty * product.finalPrice)
                                            )}
                                        </p>
                                    </Link>

                                    {/* Quantity Controls */}
                                    <div className="flex justify-center sm:justify-start items-center gap-2 mt-3">
                                        <button
                                            disabled={items.find((item) => item.productId === product._id)?.qnty <= 1}
                                            onClick={() => payloadSend("-", product)}
                                            className="px-3 py-1 border rounded text-sm"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-medium">
                                            {items.find((item) => item.productId === product._id)?.qnty || 0}
                                        </span>
                                        <button
                                            onClick={() => payloadSend("+", product)}
                                            className="px-3 py-1 border rounded text-sm"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Stock & Remove */}
                                    <div className="mt-3 flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-xs">
                                        <span className={product.stock ? "text-green-600 font-medium" : "text-red-500"}>
                                            {product.stock ? "In stock" : "Out of stock"}
                                        </span>
                                        <button
                                            onClick={() => removehandel(product)}
                                            className="py-1 px-5 text-[13px] cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 space-y-6">
                        <NoProductFound />
                        <div className="flex justify-center items-center">
                            <Link href={'/store'}>
                                <button className="cursor-pointer flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-white font-semibold shadow-md hover:from-teal-600 hover:to-emerald-600 transition-all duration-300">
                                    <ShoppingBag /> Add to Items
                                </button>
                            </Link>
                        </div>
                    </div>
                )
            }

            {/* Right Side - Order Summary */}
            <div className="w-full lg:w-[350px] bg-white rounded-lg shadow-md p-5 md:p-6 h-fit sticky top-4">
                <h2 className="text-lg font-semibold mb-4 text-center lg:text-left">Order Summary</h2>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="font-medium">
                            {formatCurrencyINR(cart?.originalPrice_Total || 0)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Saving :</span>
                        <span className="font-medium text-[#1ABA1A]">
                            {formatCurrencyINR(cart?.originalPrice_Total - cart.finalPrice_Total || 0)}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4">
                    <span>Final Price:</span>
                    <span>{formatCurrencyINR(cart?.finalPrice_Total || 0)}</span>
                </div>

                <button
                    onClick={clickHandel}
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium transition-all duration-300 cursor-pointer"
                >
                    CHECKOUT
                </button>
            </div>
        </div>

    );
}


export default CartItems;