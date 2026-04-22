"use client";
import { Edit, Trash2, RefreshCcw, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { getColors } from "../../../../../library/api_calls";
import { Axiosinstance } from "@/app/utils/helper";
import EditCompo from "../../components/EditCompo";
import Swal from "sweetalert2";
import { TbCategory2 } from "react-icons/tb";

export default function ProductsPage() {
  const [Colors, setColors] = useState([]);
  const [editflag, setEditflag] = useState(false)
  const [id, setID] = useState(null)
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getColors();
      setColors(res);
    };
    fetchData();
  }, [flag]);

  const updateColors = async (id) => {
    const res = await Axiosinstance.patch(`color/update/${id}`);
    if (res.status == 201) {
      toast.success(res.data.msg)
      setFlag(!flag)
    }
    else if (res.status == 301) {
      toast.info(res.data.msg)
    }
    else {
      toast.info(res.data.msg)
    }
  }
  const deleteColors = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        const res = await Axiosinstance.delete(`color/delete/${id}`);
        if (res.status == 201) {
          toast.success(res.data.msg)
          setFlag(!flag)
        } else if (res.status == 301) {
          toast.info(res.data.msg)
        } else {
          toast.info(res.data.msg)
        }
      }
    });
  }

  const handel = (id) => {
    setEditflag(true)
    setID(id)
  }
  return (
    <div className="p-8 w-full bg-gray-50 min-h-screen relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Colors</h1>
        <Link href="/admin/color/add">
          <button className="flex cursor-pointer items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-lg transition">
            <Plus className="w-5 h-5" /> Add colors
          </button>
        </Link>
      </div>


      {Colors.length == 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center">
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <TbCategory2 className="h-8 w-8 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800">
              No Colors Available
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Start by adding a new color to your collection.
            </p>
            <Link href="/admin/color/add">
              <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all">
                + Add Color
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden sm:block overflow-hidden rounded-2xl shadow-md bg-white">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Slug</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Colors.map((Colors, index) => (
                  <motion.tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{Colors.name}</td>
                    <td className="px-6 py-4">
                      <div
                        className="w-10 h-10 border border-gray-300 rounded-full"
                        style={{ backgroundColor: Colors.hexacode }}
                      />
                    </td>
                    <td className="px-6 py-4">{Colors.slug}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs text-white rounded-full ${Colors.status ? "bg-green-500" : "bg-red-500"
                          }`}
                      >
                        {Colors.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => deleteColors(Colors._id)}
                        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                      <button
                        onClick={() => updateColors(Colors._id)}
                        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs"
                      >
                        <RefreshCcw className="w-4 h-4" /> Update
                      </button>

                      <button
                        onClick={() => handel(Colors._id)}
                        className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </button>


                      <AnimatePresence>
                        {editflag && (
                          <motion.section
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full w-full bg-white shadow-2xl p-6"
                          >
                            <EditCompo id={id} setEditflag={setEditflag} setFlag={setFlag} flag={flag} />
                          </motion.section>
                        )}
                      </AnimatePresence>

                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid sm:hidden grid-cols-1 gap-4 mt-4">
            {
              Colors.map((Colors, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white rounded-2xl shadow-md border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {Colors.name}
                    </h3>
                    <div
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: Colors.hexacode }}
                    />
                  </div>

                  <p className="text-sm text-gray-500 mt-1">Slug: {Colors.slug}</p>
                  <span
                    className={`mt-2 inline-block px-3 py-1 text-xs text-white rounded-full ${Colors.status ? "bg-green-500" : "bg-red-500"
                      }`}
                  >
                    {Colors.status ? "Active" : "Inactive"}
                  </span>

                  <div className="mt-4 flex flex-wrap gap-2 justify-start">
                    <button
                      onClick={() => deleteColors(Colors._id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                    <button
                      onClick={() => updateColors(Colors._id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-xs"
                    >
                      <RefreshCcw className="w-4 h-4" /> Update
                    </button>
                    <button
                      onClick={() => handel(Colors._id)}
                      className="cursor-pointer flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <AnimatePresence>
                        {editflag && (
                          <motion.section
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute top-0 left-0 h-full w-full bg-white shadow-2xl p-6"
                          >
                            <EditCompo id={id} setEditflag={setEditflag} setFlag={setFlag} flag={flag} />
                          </motion.section>
                        )}
                      </AnimatePresence>
                  </div>


                </motion.div>
              )
              )}
          </div>
        </>
      )}
    </div>
  );
}
