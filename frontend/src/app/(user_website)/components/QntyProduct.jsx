'use client'
import { addQnty } from '@/app/redux/features/cartSlice'
import { Axiosinstance } from '@/app/utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function QntyProduct({ product }) {
    const dispatcher = useDispatch()
    const user = useSelector((state) => state.user.userDetails)
    const items = useSelector((state) => state.cart.items);
    const payloadSend = (flag, product) => {
        if (user != null) {
            Axiosinstance.patch(`/cart/qnty-manage/${user._id}/${product._id}/${flag}`).then((res) => {
                if (res.status == 200) {
                    toast.success(res.data.msg)
                }
            }).catch((error) => {
                console.log(error)
                toast.success("Add Product Then Increase Qnty...")

            })
        }
        dispatcher(addQnty({ product, flag }))
    }
    return (
        <div className="flex items-center gap-4 mb-5">
            <button
                disabled={items.find((item) => item.productId === product._id)?.qnty <= 1 ? true : false}
                onClick={() => payloadSend("-", product)}
                className="px-3 py-1 border rounded">-</button>
            <span className="font-bold">{items.find((item) => item.productId === product._id)?.qnty || 1}</span>
            <button onClick={() => payloadSend("+", product)}
                className="px-3 py-1 border rounded">+</button>
        </div>
    )
}

export default QntyProduct