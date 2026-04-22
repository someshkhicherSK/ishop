import { Axiosinstance } from '@/app/utils/helper';
import React from 'react'
import { toast } from 'react-toastify';

function ProductBtn({product,setFlag,flag}) {

  

    const changehandler = (flag2) => {
        Axiosinstance
            .patch(`/product/update/${product._id}`, { flag2 })
            .then((res) => {
                if (res.status == 201) {
                    toast.success(res.data.msg);
                    setFlag(!flag);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div  className=' flex items-center justify-around'>
            <button
                onClick={()=>{changehandler(1)}}
                className={`text-white px-3 py-1 cursor-pointer rounded-lg text-center ${product.status ? "bg-green-500" : "bg-red-500"
                    }`}
            >
                {product.status ? "Active" : "Inactive"}
            </button>

            
            <button
                onClick={()=>{changehandler(2)}}
                className={`text-white px-3 py-1 cursor-pointer rounded-lg text-center ${product.stock ? "bg-green-500" : "bg-red-500"
                    }`}
            >
                {product.stock ? "In" : "Out"}
            </button>

            
            <button
                onClick={()=>{changehandler(3)}}
                className={`text-white px-3 py-1 cursor-pointer rounded-lg text-center ${product.topSelling ? "bg-green-500" : "bg-red-500"
                    }`}
            >
                {product.topSelling ? "Yes" : "No"}
            </button>

        </div>
    )
}

export default ProductBtn