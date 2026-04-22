// "use client";
// import { Edit, Trash2, RefreshCcw, Plus } from "lucide-react";
// import Link from "next/link";
// import { getBrands } from "../../../../../library/api_calls";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { TbCategory2 } from "react-icons/tb";
// import { Axiosinstance } from "@/app/utils/helper";
// import Swal from "sweetalert2";

// export default function BrandsPage() {
//   const [brands, setBrands] = useState([]);
//   const [flag, setFlag] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getBrands();
//       const data = await res.data;
//       setBrands(data);
//     };
//     fetchData();
//   }, [flag]);

//   const deleteBrands = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//         Axiosinstance
//           .delete(`brands/delete/${id}`)
//           .then((res) => {
//             if (res.status == 201) {
//               toast.success(res.data.msg);
//               setFlag(!flag);
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
//   };

//   const updateBrands = (id) => {
//     Axiosinstance
//       .patch(`brands/update/${id}`)
//       .then((res) => {
//         if (res.status == 201) {
//           toast.success(res.data.msg);
//           setFlag(!flag);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="p-4 sm:p-8 w-full bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Brands</h1>
//         <Link href="/admin/brands/add" className="w-full sm:w-auto">
//           <button className="w-full sm:w-auto flex justify-center sm:justify-normal items-center gap-2 px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
//             <Plus className="w-5 h-5" /> Add Brand
//           </button>
//         </Link>
//       </div>

//       {/* Content */}
//       {brands.length === 0 ? (
//         <div className="flex justify-center items-center h-[70vh]">
//           <div className="text-center relative w-full max-w-md sm:max-w-xl border border-dashed border-gray-300 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
//             <motion.div
//               className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             />

//             <motion.div
//               className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-100"
//               initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
//               animate={{ scale: 1, rotate: 0, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 200, damping: 12 }}
//             >
//               <TbCategory2 className="h-8 w-8 text-blue-600" />
//             </motion.div>

//             <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
//               No Brands Available
//             </h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Start by adding a new brand to your collection.
//             </p>

//             <motion.button
//               className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-5 py-2 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Link href="/admin/brands/add">+ Add Brand</Link>
//             </motion.button>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table View */}
//           <div className="hidden sm:block overflow-hidden rounded-2xl shadow-md bg-white">
//             <table className="w-full text-sm text-left text-gray-600">
//               <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs font-semibold">
//                 <tr>
//                   <th className="px-6 py-3">ID</th>
//                   <th className="px-6 py-3">Logo</th>
//                   <th className="px-6 py-3">Name</th>
//                   <th className="px-6 py-3">Slug</th>
//                   <th className="px-6 py-3">Status</th>
//                   <th className="px-6 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {brands.map((brand, index) => (
//                   <motion.tr
//                     key={brand._id}
//                     className="border-b hover:bg-gray-50 transition duration-200"
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                   >
//                     <td className="px-6 py-4 font-medium">{index + 1}</td>
//                     <td className="px-6 py-4">
//                       <img
//                         className="w-[40px] h-[40px] object-contain rounded-lg border"
//                         src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${brand.logo}`}
//                         alt={brand.name}
//                       />
//                     </td>
//                     <td className="px-6 py-4">{brand.name}</td>
//                     <td className="px-6 py-4">{brand.slug}</td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 text-xs text-white rounded-full ${brand.status ? "bg-green-500" : "bg-red-500"
//                           }`}
//                       >
//                         {brand.status ? "Active" : "Inactive"}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 flex justify-center gap-2">
//                       <button
//                         onClick={() => deleteBrands(brand._id)}
//                         className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
//                       >
//                         <Trash2 className="w-4 h-4" /> Delete
//                       </button>
//                       <button
//                         onClick={() => updateBrands(brand._id)}
//                         className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs"
//                       >
//                         <RefreshCcw className="w-4 h-4" /> Update
//                       </button>
//                       <Link href={`/admin/brands/edit/${brand._id}`}>
//                         <button className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
//                           <Edit className="w-4 h-4" /> Edit
//                         </button>
//                       </Link>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Card View */}
//           <div className="grid sm:hidden grid-cols-1 gap-4 mt-4">
//             {brands.map((brand, index) => (
//               <motion.div
//                 key={index}
//                 className="p-4 bg-white rounded-2xl shadow-md border border-gray-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: index * 0.05 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {brand.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mt-1">{brand.slug}</p>
//                   </div>
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${brand.logo}`}
//                     alt={brand.name}
//                     className="w-12 h-12 object-contain rounded-md border"
//                   />
//                 </div>

//                 <span
//                   className={`mt-3 inline-block px-3 py-1 text-xs text-white rounded-full ${brand.status ? "bg-green-500" : "bg-red-500"
//                     }`}
//                 >
//                   {brand.status ? "Active" : "Inactive"}
//                 </span>

//                 <div className="mt-4 flex flex-wrap gap-2 justify-start">
//                   <button
//                     onClick={() => deleteBrands(brand._id)}
//                     className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
//                   >
//                     <Trash2 className="w-4 h-4" /> Delete
//                   </button>
//                   <button
//                     onClick={() => updateBrands(brand._id)}
//                     className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs"
//                   >
//                     <RefreshCcw className="w-4 h-4" /> Update
//                   </button>
//                   <Link href={`/admin/brands/edit/${brand._id}`}>
//                     <button className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs">
//                       <Edit className="w-4 h-4" /> Edit
//                     </button>
//                   </Link>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>

//   );
// }
 useEffect(() => {
  getBrands().then(res => console.log(res));
}, []);
