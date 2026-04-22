"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Axiosinstance } from "@/app/utils/helper";
import NoProductFound from "../../components/store/NoProductFound";

export default function ThankYouPage() {
    const { order_id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Axiosinstance.get(`/order/order-find/${order_id}`)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => {
                setError(err.response?.data?.msg || "Something went wrong");
            });
    }, [order_id]);

    if (error) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <NoProductFound/>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-md"
                >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <motion.span
                        className="text-sm font-medium"
                        animate={{ x: [0, -5, 5, -5, 5, 0] }} // thoda shake
                        transition={{ duration: 0.4 }}
                    >
                        {error}
                    </motion.span>
                </motion.div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-4 bg-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="p-10 text-center"
            >
                <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                >
                    <CheckCircle2 className="mx-auto text-green-500" size={90} />
                </motion.div>

                <motion.h1
                    className="text-3xl font-bold text-gray-800 mt-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Thank You! 🎉
                </motion.h1>

                <motion.p
                    className="text-gray-600 mt-2 text-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Your order{" "}
                    <span className="font-semibold text-blue-600">#{order_id}</span> has
                    been placed successfully.
                </motion.p>

                <motion.p
                    className="text-gray-500 text-sm mt-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    We’ve sent you a confirmation email with your order details.
                </motion.p>

                <motion.div
                    className="mt-6 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <Link
                        href="/orders"
                        className="block w-full py-3 bg-[#01A49E] text-white font-semibold rounded-lg shadow hover:bg-[#077e7a] transition"
                    >
                        View My Orders
                    </Link>
                    <Link
                        href="/store"
                        className="block w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Continue Shopping
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
