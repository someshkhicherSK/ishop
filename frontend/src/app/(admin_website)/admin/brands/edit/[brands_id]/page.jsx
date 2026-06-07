// "use client";
// import { Axiosinstance, helper } from "@/app/utils/helper";
// import { PenIcon } from "lucide-react";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { toast } from 'react-toastify';
// import { getBrands } from "../../../../../../../library/api_calls";

// function page() {
//   const { brands_id } = useParams()
//   const [brand, setBrand] = useState({});
//   const router = useRouter();
//   const nameRfe = useRef(null);
//   const slugRfe = useRef(null);
//   const statusRfe = useRef(null);
//   const imgRfe = useRef(null);

  
  
//   const formHandler = (e) => {
//     e.preventDefault();
//     const name = nameRfe.current.value;
//     const slug = slugRfe.current.value;
//     const status = statusRfe.current.checked?true:false;
//     const logo = imgRfe.current.files[0];
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("slug", slug);
//     formData.append("status", status);
//     formData.append("logo", logo);
//     Axiosinstance.put(`brands/edit/${brands_id}`, formData).then((res) => {
//       if (res.status == 201) {
//         toast.success(res.data.msg)
//         setTimeout(() => {
//           router.push('/admin/brands');
//         }, 5000);
//       }
//     }).catch((err) => {
//       if (err.response.status == 301) {
//         toast.warning(err.response.data.msg)
//       }
//       else {
//         toast.warning(err.response.data.msg)
//       }
//     });
//   };

//   const createSlug = () => {
//     const slug = helper(nameRfe.current.value);
//     slugRfe.current.value = slug;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getBrands(brands_id);
//       const data = await res.getBrand;
//       setBrand(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 w-full">
//       <div className="w-full  bg-white rounded-2xl shadow-xl p-8">
//         <div className="flex items-center gap-2 mb-6">
//           <PenIcon className="w-6 h-6 text-blue-600" />
//           <h1 className="text-2xl font-bold text-gray-800">Edit Brand</h1>
//         </div>

//         <form className="space-y-5" onSubmit={formHandler}>
//           {/* Category Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Brand Name
//             </label>
//             <input
//               type="text"
//               required
//               defaultValue={brand.name}
//               ref={nameRfe}
//               onChange={createSlug}
//               placeholder="Enter category name"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//           </div>

//           {/* Slug */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Slug
//             </label>
//             <input
//               type="text"
//               ref={slugRfe}
//               defaultValue={brand.slug}
//               required
//               placeholder="auto-generated or enter manually"
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               brand Image
//             </label>

//             <label
//               htmlFor="brandlogo"
//               className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
//             >
//               <span className="text-gray-600 text-sm font-medium">
//                 Click to upload or drag & drop
//               </span>
//               <span className="text-xs text-gray-400">PNG, JPG up to 2MB</span>
//               <input
//                 id="brandlogo"
//                 type="file"
//                 accept="image/*"
//                 name="image"
//                 ref={imgRfe}
//                 className="hidden"
//               />
//             </label>
//           </div>

//           {/* Pre Image */}
//           <div className=" h-[100px] mt-2">
//             <img
//               className="w-[80px] h-auto"
//               src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${brand.logo}`} alt={brand.logo} />
//           </div>

//           {/* Status */}
//           <div className="flex items-center gap-3">
//             <label className="text-sm font-medium text-gray-600">
//               Active Status
//             </label>
//             <input
//               type="checkbox"
//               className="toggle toggle-primary"
//               ref={statusRfe}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 pt-4">
//             <Link href="/admin/brands">
//               <button
//                 type="button"
//                 className="px-5 py-2 cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//             </Link>
//             <button
//               type="submit"
//               className="px-5 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               Save Category
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>

//   );
// }

// export default page;


"use client";

import { Axiosinstance, helper } from "@/app/utils/helper";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getBrands } from "../../../../../../../library/api_calls";

export default function Page() {
  const { brands_id } = useParams();
  const [brand, setBrand] = useState(null);

  const router = useRouter();

  const nameRfe = useRef(null);
  const slugRfe = useRef(null);
  const statusRfe = useRef(null);
  const imgRfe = useRef(null);

  const createSlug = () => {
    if (nameRfe.current && slugRfe.current) {
      slugRfe.current.value = helper(nameRfe.current.value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBrands(brands_id);

        const data = res?.getBrand || res?.data?.getBrand || null;

        setBrand(data);

        setTimeout(() => {
          if (statusRfe.current && data) {
            statusRfe.current.checked = data.status;
          }
        }, 100);
      } catch (error) {
        console.log(error);
        toast.error("Brand not found");
      }
    };

    if (brands_id) {
      fetchData();
    }
  }, [brands_id]);

  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", nameRfe.current.value);
      formData.append("slug", slugRfe.current.value);
      formData.append(
        "status",
        statusRfe.current.checked ? true : false
      );

      // image optional
      if (imgRfe.current.files.length > 0) {
        formData.append("logo", imgRfe.current.files[0]);
      }

      const res = await Axiosinstance.put(
        `brands/edit/${brands_id}`,
        formData
      );

      toast.success(
        res?.data?.msg || "Brand Updated Successfully"
      );

      setTimeout(() => {
        router.push("/admin/brands");
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.msg || "Something went wrong"
      );
    }
  };

  if (!brand) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 w-full">
      <div className="w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <PenIcon className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Brand
          </h1>
        </div>

        <form className="space-y-5" onSubmit={formHandler}>
          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Brand Name
            </label>

            <input
              type="text"
              required
              defaultValue={brand?.name || ""}
              ref={nameRfe}
              onChange={createSlug}
              placeholder="Enter brand name"
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
              defaultValue={brand?.slug || ""}
              required
              placeholder="auto-generated or enter manually"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Brand Logo
            </label>

            <label
              htmlFor="brandlogo"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="text-gray-600 text-sm font-medium">
                Click to upload or drag & drop
              </span>

              <span className="text-xs text-gray-400">
                PNG, JPG up to 2MB
              </span>

              <input
                id="brandlogo"
                type="file"
                accept="image/*"
                ref={imgRfe}
                className="hidden"
              />
            </label>
          </div>

          {/* Preview */}
          <div className="h-[100px] mt-2">
            <img
              className="w-[80px] h-auto"
              src={
                brand?.logo
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}images/brands/${brand.logo}`
                  : "/no-image.png"
              }
              alt="brand"
            />
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-600">
              Active Status
            </label>

            <input
              type="checkbox"
              defaultChecked={brand?.status}
              className="toggle toggle-primary"
              ref={statusRfe}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link href="/admin/brands">
              <button
                type="button"
                className="px-5 py-2 cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="px-5 py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
            >
              Save Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}