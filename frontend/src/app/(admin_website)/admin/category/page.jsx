// "use client";

// import { Plus, Pencil, Trash2 } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { Axiosinstance } from "@/app/utils/helper";
// import { toast } from "react-toastify";

// export default function CategoryPage() {

//   const [categories, setCategories] = useState([]);
//   const [refresh, setRefresh] = useState(false);

//   useEffect(() => {
//     Axiosinstance.get("category/get")
//       .then(res => {
//         setCategories(res.data.data);
//       });
//   }, [refresh]);

//   const toggle = (id, flag) => {
//     Axiosinstance.patch(`category/status/${id}`, { flag })
//       .then(() => setRefresh(!refresh));
//   };

//   const deleteCategory = (id) => {
//     Swal.fire({
//       title: "Delete?",
//       showCancelButton: true,
//     }).then(r => {
//       if (r.isConfirmed) {
//         Axiosinstance.delete(`category/delete/${id}`).then(() => {
//           toast.success("Deleted");
//           setRefresh(!refresh);
//         });
//       }
//     });
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">

//       <div className="flex justify-between mb-6">
//         <h2 className="text-2xl font-bold">Category Management</h2>
//         <Link href="/admin/category/add">
//           <button className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2">
//             <Plus size={18} /> Add Category
//           </button>
//         </Link>
//       </div>

//       <div className="bg-white rounded shadow p-4 overflow-x-auto">
//         <table className="w-full text-sm">

//           <thead>
//             <tr className="border-b">
//               <th>Image</th>
//               <th>Name</th>
//               <th>Slug</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {categories.map(cat => (

//               <tr key={cat._id} className="border-b">

//                 <td>
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
//                     className="w-12 h-12 rounded"
//                   />
//                 </td>

//                 <td>{cat.name}</td>
//                 <td>{cat.slug}</td>

//                 <td className="flex gap-1">

//                   <button onClick={()=>toggle(cat._id,"1")} className="bg-gray-600 text-white px-2 rounded">Status</button>
//                   <button onClick={()=>toggle(cat._id,"2")} className="bg-blue-600 text-white px-2 rounded">Home</button>
//                   <button onClick={()=>toggle(cat._id,"3")} className="bg-purple-600 text-white px-2 rounded">Top</button>
//                   <button onClick={()=>toggle(cat._id,"4")} className="bg-orange-600 text-white px-2 rounded">Best</button>

//                 </td>

//                 <td className="flex gap-2">

//                   <Link href={`/admin/category/edit/${cat._id}`}>
//                     <button className="bg-green-600 text-white p-2 rounded">
//                       <Pencil size={14}/>
//                     </button>
//                   </Link>

//                   <button onClick={()=>deleteCategory(cat._id)} className="bg-red-600 text-white p-2 rounded">
//                     <Trash2 size={14}/>
//                   </button>

//                 </td>

//               </tr>

//             ))}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// }





"use client";

import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Axiosinstance } from "@/app/utils/helper";
import { toast } from "react-toastify";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    Axiosinstance.get("category/get").then((res) => {
      setCategories(res.data.data);
    });
  }, [refresh]);

  const toggle = (id, flag) => {
    Axiosinstance.patch(`category/status/${id}`, { flag }).then(() =>
      setRefresh(!refresh)
    );
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
    }).then((r) => {
      if (r.isConfirmed) {
        Axiosinstance.delete(`category/delete/${id}`).then(() => {
          toast.success("Category Deleted");
          setRefresh(!refresh);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Category Management
          </h1>
          <p className="text-slate-500 text-sm">
            Manage all product categories
          </p>
        </div>

        <Link href="/admin/category/add">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl shadow-md transition">
            <Plus size={18} />
            Add Category
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Slug</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-4 font-semibold text-slate-700">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
                        alt={cat.name}
                        className="w-16 h-16 rounded-xl object-cover border shadow-sm"
                      />
                    </td>

                    <td className="p-4 font-medium text-slate-800">
                      {cat.name}
                      
                    </td>

                    <td className="p-4 text-slate-500">{cat.slug}</td>

                    <td className="p-4">
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => toggle(cat._id, "1")}
                          className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Status
                        </button>

                        <button
                          onClick={() => toggle(cat._id, "2")}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Home
                        </button>

                        <button
                          onClick={() => toggle(cat._id, "3")}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Top
                        </button>

                        <button
                          onClick={() => toggle(cat._id, "4")}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs"
                        >
                          Best
                        </button>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link href={`/admin/category/edit/${cat._id}`}>
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg shadow">
                            <Pencil size={16} />
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteCategory(cat._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-500"
                  >
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}