'use client'
import { emptyCart } from "@/app/redux/features/cartSlice";
import { Axiosinstance, formatCurrencyINR } from "@/app/utils/helper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRazorpay } from "react-razorpay";

export default function CheckoutPage() {
    const { Razorpay } = useRazorpay()
    const [address, setAddress] = useState(0)
    const [payment, setPayment] = useState(0)
    const router = useRouter()
    const user = useSelector((state) => state.user.userDetails)
    const userToken = useSelector((state) => state.user.token)
    const cart = useSelector((state) => state.cart)
    const dispatcher = useDispatch()


    const submithandler = () => {
        if (user?.shipping_address.length <= 0) {
            router.push('/profile')
            return toast.info("Please Add Address...");
        }
        Axiosinstance.post('order/order-place', {
            userId: user?._id,
            payment_mode: payment,
            shipping_details: user.shipping_address[address]
        }).then((res) => {
            if (res.data.success) {
                if (payment == 0) {
                    dispatcher(emptyCart())
                    router.push(`thankyou/${res.data.order_id}`)
                    toast.success(res.data.msg)

                }
                else {
                    const options = {
                        key: "rzp_test_RLJOXToaSAhYti",
                        currency: "INR",
                        name: "Vikash Company",
                        description: "Test Transaction",
                        order_id: res.data.razorpay_order_id, // Generate order_id on server
                        handler: (Razorpayresponse) => {
                            Axiosinstance.post('order/order-success', {
                                order_id: res.data.order_id,
                                user_id: user?._id,
                                razorpay_response: Razorpayresponse
                            },
                                {
                                    headers: {
                                        Authorization: userToken,
                                    }
                                }
                            ).then((res) => {
                                dispatcher(emptyCart())
                                router.push(`thankyou/${res.data.order_id}`)
                                toast.success(res.data.message)
                            }).catch((error) => {
                                console.log(error)
                            })
                        },

                        prefill: {
                            name: user?.name,
                            email: user?.email,
                            contact: user.shipping_address[address].contact,
                        },
                        theme: {
                            color: "#F37254",
                        },
                    };
                    const razorpayInstance = new Razorpay(options);
                    razorpayInstance.open();
                }
            }
        }
        ).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (!user) {
            router.push('/user-login?rfe=/checkout')
        } else {
            router.push('/checkout')
        }
    }, [user])




    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-8 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Address List */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">Select Address</h2>
                        <div className="space-y-3">
                            {user?.shipping_address?.map((add, index) => (
                                <div
                                    key={index}
                                    onClick={() => setAddress(index)}
                                    style={{
                                        backgroundColor: index === address ? "#01A49E" : "white",
                                        color: index === address ? "white" : "#555",
                                    }}
                                    className="p-4 border rounded-xl cursor-pointer hover:bg-[#01A49E] transition text-sm sm:text-base"
                                >
                                    <p className="font-medium">{user?.name || "User"}</p>
                                    <p>{add.addressLine1}, {add.addressLine2}, {add.city}, {add.state}</p>
                                    <p>{add.country}, Code: {add.zip}</p>
                                    <p>Contact: {add.contact}</p>
                                </div>
                            ))}

                            <Link href={'/profile'}>
                                <button className="mt-2 w-full sm:w-auto cursor-pointer px-4 py-2 bg-[#01A49E] text-white rounded-xl hover:bg-[#037a76] transition text-sm sm:text-base">
                                    + Add New Address
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">Select Payment Mode</h2>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                            <button
                                onClick={() => setPayment(0)}
                                className={`${payment == 0 ? "bg-[#01A49E] text-white" : "text-black"} cursor-pointer w-full px-4 py-3 font-semibold rounded-xl shadow-md border border-gray-300 transition text-sm sm:text-base`}
                            >
                                Cash on Delivery (COD)
                            </button>
                            <button
                                onClick={() => setPayment(1)}
                                className={`${payment == 1 ? "bg-[#01A49E] text-white" : "text-black"} cursor-pointer w-full px-4 py-3 font-semibold rounded-xl shadow-md border border-gray-300 transition text-sm sm:text-base`}
                            >
                                Online Payment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section - Order Summary */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md h-fit lg:sticky lg:top-6">
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center lg:text-left">Order Summary</h2>
                    <div className="space-y-3 text-sm sm:text-base font-medium">
                        <div className="flex justify-between">
                            <span>Total Amount:</span>
                            <span>{formatCurrencyINR(cart?.originalPrice_Total || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span className="text-[#1ABA1A]">{formatCurrencyINR(cart?.originalPrice_Total - cart?.finalPrice_Total || 0)}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-3">
                            <span>Final Amount:</span>
                            <span>{formatCurrencyINR(cart?.finalPrice_Total || 0)}</span>
                        </div>
                    </div>

                    <button
                        onClick={submithandler}
                        className="mt-6 cursor-pointer w-full px-4 py-3 bg-[#01A49E] text-white rounded-xl hover:bg-[#077a77] transition text-sm sm:text-base"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>

    );
}
