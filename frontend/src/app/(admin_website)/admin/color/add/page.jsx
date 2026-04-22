"use client";
import { Axiosinstance, getCokies, helper } from "@/app/utils/helper";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from 'react-toastify';


function page() {
  const router = useRouter();
  const token = getCokies('admin_token')
  const nameRfe = useRef(null);
  const slugRfe = useRef(null);
  const statusRfe = useRef(null);
  const formHandler = (e) => {
    e.preventDefault();
    const name = nameRfe.current.value;
    const slug = slugRfe.current.value;
    const status = statusRfe.current.checked;
    const hexacode = e.target.hexacode.value;
    const data = {
      name,
      slug,
      status,
      hexacode
    }
    
    Axiosinstance.post("color/create", data, {
      headers:{
        Authorization:token
      }
    }).then((res) => {
      if (res.status == 201) {
        toast.success(res.data.msg)
        setTimeout(() => {
          router.push('/admin/color');
        }, 5000);
      }
    }).catch((err) => {
      if (err.response.status == 301) {
        toast.warning(err.response.data.msg)
      }
      else {
        toast.warning(err.response.data.msg)
      }
    });
  };
  const createSlug = () => {
    const slug = helper(nameRfe.current.value);
    slugRfe.current.value = slug;
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 w-full">
      <div className="w-full  bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Add New Color</h1>
        </div>

        <form className="space-y-5" onSubmit={formHandler}>
          {/* color Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Color Name
            </label>
            <input
              type="text"
              required
              ref={nameRfe}
              onChange={createSlug}
              placeholder="Enter color name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Slug
            </label>
            <input
              type="text"
              ref={slugRfe}
              required
              placeholder="auto-generated or enter manually"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Hexacode */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hexa Code
            </label>
            <input
              type="color"
              required
              name="hexacode"
              placeholder=" select manually color"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>



          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">
              Active Status
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              ref={statusRfe}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/color">
              <button
                type="button"
                className="cursor-pointer px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="cursor-pointer px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              Save Color
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default page;
