"use client";
import { Edit, Trash2, Star, ShieldCheck, Truck, Sparkles, Plus, X, Eye } from "lucide-react";
import Link from "next/link";
import { getProduct } from "../../../../../library/api_calls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TbCategory2 } from "react-icons/tb";
import { Axiosinstance } from "@/app/utils/helper";
import { motion, AnimatePresence } from "framer-motion";
import ProductBtn from "../../components/ProductBtn";
import Swal from "sweetalert2";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [flag, setFlag] = useState(false);
  const [toggleId, setToggleId] = useState('')
  const [viweflag, setViweflag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProduct();
      setProduct(res);
    };
    fetchData();
  }, [flag]);

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        Axiosinstance
          .delete(`product/delete/${id}`)
          .then((res) => {
            if (res.status == 201) {
              toast.success(res.data.msg);
              setFlag(!flag);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };


  const toggle = (productObj) => {
    setToggleId(productObj)
    setViweflag(true)
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Products</h1>
        <Link href="/admin/product/add">
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition text-sm sm:text-base">
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </Link>
      </div>

      {/* Empty State */}
      {product.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm"
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            <TbCategory2 className="mx-auto text-blue-500 h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">No Products Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven’t added any products yet. Start by adding one below.
            </p>
            <motion.button
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-md hover:shadow-lg"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/admin/product/add">+ Add Product</Link>
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <>
          {/* 📱 Mobile View (Card layout) */}
          <div className="grid grid-cols-1 sm:hidden gap-4">
            {product.map((p, index) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${p.thumbnail}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    <p className="text-xs text-gray-500">{p.slug}</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <ProductBtn product={p} flag={flag} setFlag={setFlag} />
                </div>

                <div className="mt-4 flex flex-wrap justify-between gap-2">
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                  <Link href={`/admin/product/edit/${p._id}`} className="flex-1">
                    <button className="w-full flex items-center justify-center gap-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-xs">
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => toggle(p)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 💻 Desktop View (Table layout) */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-md bg-white">
            <table className="min-w-[800px] w-full text-sm text-left text-gray-600">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Thumbnail</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3 text-center">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {product.map((p, index) => (
                  <tr key={index + 1} className="border-b hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                      <img
                        className="w-[40px] h-[40px] rounded-md object-cover"
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${p.thumbnail}`}
                        alt={p.thumbnail}
                      />
                    </td>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.slug}</td>
                    <td className="px-6 py-4 text-center">
                      <ProductBtn product={p} flag={flag} setFlag={setFlag} />
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                      <Link href={`/admin/product/edit/${p._id}`}>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
                          <Edit className="w-4 h-4" /> Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => toggle(p)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AnimatePresence>
            {viweflag && (
              <motion.section
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 overflow-y-auto shadow-2xl rounded-2xl bg-white z-50"
              >
                <ViwesCompo PRODUCT={toggleId} setViweflag={setViweflag} />
              </motion.section>
            )}
          </AnimatePresence>
        </>
      )}
    </div>


  );
}



const ViwesCompo = ({ setViweflag, PRODUCT }) => {
  console.log(PRODUCT)
  return (
    <div className="h-[100%]  bg-gradient-to-b from-white to-slate-50 p-4 md:p-8">
      <div className="flex justify-end px-4 mb-3">
        <button
          onClick={() => setViweflag(false)}
          aria-label="Close"
          className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white shadow hover:bg-slate-100 hover:text-red-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Images */}
        <div className="rounded-2xl shadow bg-white p-4 md:p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <div className="w-full h-[300px] py-4 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${PRODUCT.thumbnail}`}
                alt={PRODUCT.thumbnail}
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {PRODUCT.images.map((src, i) => (
                <div key={i} className="aspect-square p-4 rounded-xl overflow-hidden ring-1 ring-slate-200">
                  <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${src}`} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Info */}
        <div className="space-y-4">
          <div className="rounded-2xl shadow bg-white p-6">
            <div className="flex items-center gap-2 mb-2">
              {PRODUCT.status ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">Active</span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Inactive</span>
              )}

              {PRODUCT.topSelling ? (
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-white">TopSelling-Yes</span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-slate-800">TopSelling-No</span>
              )}
              {PRODUCT.stock ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">In Stock</span>
              ) : (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">Out Stock</span>
              )}


            </div>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-1">{PRODUCT.name}</h1>

            {/* Ratings (placeholder) */}
            <div className="flex items-center gap-1 text-amber-500 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
              <span className="ml-2 text-xs text-slate-500">(4.9 • 2,341 reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-end gap-3 mb-3">
              <div className="text-3xl font-semibold tracking-tight">₹{PRODUCT.finalPrice}</div>
              <div className="text-slate-400 line-through">₹{PRODUCT.originalPrice}</div>
              <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">{PRODUCT.discountPercentage}% OFF</span>
            </div>



            {/* Utility chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs border flex items-center gap-1"><ShieldCheck className="h-4 w-4" />1 Year Warranty</span>
              <span className="px-3 py-1 rounded-full text-xs border flex items-center gap-1"><Truck className="h-4 w-4" />Fast Delivery</span>
              <span className="px-3 py-1 rounded-full text-xs border flex items-center gap-1"><Sparkles className="h-4 w-4" />Premium Build</span>
            </div>

            <div className="mb-4">
              <h3>Colors</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {
                  PRODUCT.colors?.map((clr, index) => {
                    return <div
                      style={{ backgroundColor: clr.hexacode }}
                      className="shadow-2xl px-3 py-1 border border-slate-100 rounded-2xl text-white" key={index + 1}>{clr.name}</div>
                  })
                }
              </div>
            </div>
            <div className="mb-4">
              <h3>Category</h3>
              <div className="mt-2 border-slate-100 bg-amber-500 font-bold rounded-2xl text-black shadow-2xl px-3 py-1">{PRODUCT.categoryId.name}</div>
            </div>
            <div className="mb-4">
              <h3>Brand</h3>
              <div className="mt-2 border-slate-100  bg-amber-500 font-bold rounded-2xl text-black shadow-2xl px-3 py-1">{PRODUCT.BrandId.name}</div>
            </div>
          </div>
          {/* Details Tabs (simplified) */}
          <div className="rounded-2xl shadow bg-white">
            <div className="p-6 text-slate-600 text-sm">
              <h3 className=" capitalize text-sm font-bold mb-3">longDescription</h3>
              <div dangerouslySetInnerHTML={{ __html: PRODUCT.longDescription }} />
              <h3 className=" capitalize text-sm font-bold my-3">shortDescription</h3>
              <p className="text-slate-600 leading-relaxed mb-4">{PRODUCT.shortDescription}</p>
            </div>

            <div className="p-6 text-slate-600 text-sm">

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}