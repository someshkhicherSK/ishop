
import { PhoneCall } from "lucide-react";
import { getProduct } from "../../../../../library/api_calls";
import CartBtn from "../../components/CartBtn";
import ChangeImages from "../../components/ChangeImages";
import { FaCcMastercard, FaCcVisa, FaUniversity } from "react-icons/fa";
import NoProductFound from "../../components/store/NoProductFound";
import QntyProduct from "../../components/QntyProduct";

export default async function ProductPage({ params }) {
  const { product_id } = await params;
  let product = null;
  try {
    product = await getProduct(product_id);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    product = null;
  }
  if (!product) {
    return (
      <div className="px-6 py-10 text-center">
        <NoProductFound />
      </div>
    );
  }

  return (
    <div className=" px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 bg-white ">
      {/* Left - Images */}
      <ChangeImages product={product} />

      {/* Middle - Details */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-sm text-gray-600 mb-4">{product.shortDescription}</p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-green-600">
            ₹{product.finalPrice?.toLocaleString()}
          </h2>
          <span className="line-through text-gray-400">
            ₹{product.originalPrice?.toLocaleString()}
          </span>
          <span className="text-sm text-red-500 font-semibold">
            -{product.discountPercentage}%
          </span>
        </div>

        {/* Features */}
        <ul className="flex gap-x-3 text-sm  mb-5">
          <li className="text-[#1ABA1A] bg-gray-100 px-3 py-1 rounded-2xl">Free Shipping</li>
          <li className="text-[#F1352B] bg-gray-100 px-3 py-1 rounded-2xl">Free Gift</li>
        </ul>

        {/* Colors */}
        <div className="mb-5">
          <p className="font-semibold mb-2">COLOR:</p>
          <div className="flex gap-3">
            {product.colors?.map((c, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border border-gray-100 cursor-pointer"
                style={{ backgroundColor: c.hexacode }}
              ></div>
            ))}
          </div>
        </div>

        {/* Storage / Variant Example */}
        <div className="mb-5">
          <p className="font-semibold mb-2">Description</p>
          <div className=" gap-3"
            dangerouslySetInnerHTML={{ __html: product.longDescription }}

          >


          </div>
        </div>


        {/* Extra Info */}
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-bold">SKU:</span> {product._id}
        </p>
        <p className="text-sm text-[#F1352B] font-bold  mb-1">
          <span className="text-gray-600">Category:</span>{" "}
          {product.categoryId?.name}
        </p>
        <p className="text-sm text-[#1ABA1A] font-bold  mb-5">
          <span className=" text-gray-600">Brand:</span>  {product.BrandId?.name}
        </p>
      </div>

      {/* Right - Cart Box */}
      <div className="bg-[#EDEFF6] rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">
          Total Price:{" "}
        </h2>
        <h2 className="text-[30px] font-bold mb-4">
          <span className="text-green-600">
            ₹{product.finalPrice?.toLocaleString()}
          </span>
        </h2>

        <p className="text-green-600 font-medium mb-4">✔ In Stock</p>

        {/* Quantity */}
        <QntyProduct product={product}/>

        <div className="flex h-[50px] mb-4">

          <CartBtn productId={product?._id} finalPrice={product?.finalPrice} originalPrice={product?.originalPrice} w={100} h={100} />
        </div>
        <button className="w-full py-3 bg-yellow-500 text-white rounded-lg mb-5 hover:bg-yellow-600">
          BUY WITH PayPal
        </button>

        <p className="text-xs text-gray-500 mb-2">
          Guaranteed Safe Checkout ✅
        </p>
        <div className="flex gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-4 text-2xl text-gray-700">
            <FaCcVisa title="Visa" className="hover:text-blue-600" />
            <FaCcMastercard title="MasterCard" className="hover:text-red-600" />
            <FaUniversity title="Net Banking" className="hover:text-green-600" />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="font-semibold  bg-[#333333] flex items-center w-[200px] text-white py-2 px-3 rounded-[7px] text-[14px] justify-center gap-x-1 mb-4"><PhoneCall /> Quick Order 24/7</p>
          <p className="text-lg font-semibold text-left text-green-600 bg-white py-2 px-3 w-[200px] rounded-[7px]">
            +91 6375256614
          </p>
        </div>
      </div>
    </div>
  );
}
