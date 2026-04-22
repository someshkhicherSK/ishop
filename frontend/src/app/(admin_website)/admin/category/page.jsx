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
    Axiosinstance.get("category/get")
      .then(res => {
        setCategories(res.data.data);
      });
  }, [refresh]);

  const toggle = (id, flag) => {
    Axiosinstance.patch(`category/status/${id}`, { flag })
      .then(() => setRefresh(!refresh));
  };

  const deleteCategory = (id) => {
    Swal.fire({
      title: "Delete?",
      showCancelButton: true,
    }).then(r => {
      if (r.isConfirmed) {
        Axiosinstance.delete(`category/delete/${id}`).then(() => {
          toast.success("Deleted");
          setRefresh(!refresh);
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Link href="/admin/category/add">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded flex gap-2">
            <Plus size={18} /> Add Category
          </button>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              <th>Image</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(cat => (

              <tr key={cat._id} className="border-b">

                <td>
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
                    className="w-12 h-12 rounded"
                  />
                </td>

                <td>{cat.name}</td>
                <td>{cat.slug}</td>

                <td className="flex gap-1">

                  <button onClick={()=>toggle(cat._id,"1")} className="bg-gray-600 text-white px-2 rounded">Status</button>
                  <button onClick={()=>toggle(cat._id,"2")} className="bg-blue-600 text-white px-2 rounded">Home</button>
                  <button onClick={()=>toggle(cat._id,"3")} className="bg-purple-600 text-white px-2 rounded">Top</button>
                  <button onClick={()=>toggle(cat._id,"4")} className="bg-orange-600 text-white px-2 rounded">Best</button>

                </td>

                <td className="flex gap-2">

                  <Link href={`/admin/category/edit/${cat._id}`}>
                    <button className="bg-green-600 text-white p-2 rounded">
                      <Pencil size={14}/>
                    </button>
                  </Link>

                  <button onClick={()=>deleteCategory(cat._id)} className="bg-red-600 text-white p-2 rounded">
                    <Trash2 size={14}/>
                  </button>

                </td>

              </tr>

            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
