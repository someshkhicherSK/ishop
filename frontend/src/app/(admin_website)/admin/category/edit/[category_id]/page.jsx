// "use client";

// import { Axiosinstance, helper } from "@/app/utils/helper";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import Link from "next/link";

// export default function EditCategory() {

//   const { category_id } = useParams();
//   const router = useRouter();

//   const [cat, setCat] = useState(null);

//   const nameRef = useRef();
//   const slugRef = useRef();
//   const imgRef = useRef();

//   useEffect(() => {
//     Axiosinstance.get(`category/get/${category_id}`)
//       .then(res => setCat(res.data.getCategory));
//   }, []);

//   const createSlug = () => {
//     slugRef.current.value = helper(nameRef.current.value);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append("name", nameRef.current.value);
//     form.append("slug", slugRef.current.value);
//     if (imgRef.current.files[0]) {
//       form.append("image", imgRef.current.files[0]);
//     }

//     Axiosinstance.put(`category/update/${category_id}`, form)
//       .then(() => {
//         toast.success("Updated");
//         router.push("/admin/category");
//       });
//   };

//   if (!cat) return null;

//   return (
//     <div className="p-6">

//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold">Edit Category</h2>
//         <Link href="/admin/category">Back</Link>
//       </div>

//       <form onSubmit={submitHandler} className="space-y-4">

//         <input
//           defaultValue={cat.name}
//           ref={nameRef}
//           onChange={createSlug}
//           className="border p-2 w-full"
//         />

//         <input
//           defaultValue={cat.slug}
//           ref={slugRef}
//           className="border p-2 w-full"
//         />

//         <img
//           src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
//           className="w-24"
//         />

//         <input type="file" ref={imgRef} />

//         <button className="bg-green-600 text-white px-4 py-2 rounded">
//           Update
//         </button>

//       </form>

//     </div>
//   );
// }



// "use client";

// import { Axiosinstance, helper } from "@/app/utils/helper";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import Link from "next/link";

// export default function EditCategory() {
//   const params = useParams();
//   const category_id = params.category_id || params.id;

//   const router = useRouter();

//   const [cat, setCat] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const nameRef = useRef();
//   const slugRef = useRef();
//   const imgRef = useRef();

//   useEffect(() => {
//     if (!category_id) return;

//     Axiosinstance.get(`category/get/${category_id}`)
//       .then((res) => {
//         setCat(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Category not found");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [category_id]);

//   const createSlug = () => {
//     slugRef.current.value = helper(nameRef.current.value);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();

//       form.append("name", nameRef.current.value);
//       form.append("slug", slugRef.current.value);

//       if (imgRef.current.files[0]) {
//         form.append("image", imgRef.current.files[0]);
//       }

//       await Axiosinstance.put(
//         `category/update/${category_id}`,
//         form
//       );

//       toast.success("Category Updated");

//       router.push("/admin/category");
//     } catch (error) {
//       console.log(error);
//       toast.error("Update Failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-500">
//         Loading...
//       </div>
//     );
//   }

//   if (!cat) {
//     return (
//       <div className="p-10 text-center text-red-500">
//         Category Not Found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

//           <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
//             <h2 className="text-xl font-bold">
//               Edit Category
//             </h2>

//             <Link
//               href="/admin/category"
//               className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-medium"
//             >
//               Back
//             </Link>
//           </div>

//           <form
//             onSubmit={submitHandler}
//             className="p-6 space-y-5"
//           >
//             <div>
//               <label className="block mb-2 font-medium">
//                 Category Name
//               </label>

//               <input
//                 defaultValue={cat.name}
//                 ref={nameRef}
//                 onChange={createSlug}
//                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">
//                 Slug
//               </label>

//               <input
//                 defaultValue={cat.slug}
//                 ref={slugRef}
//                 className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">
//                 Current Image
//               </label>

//               <img
//                 src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
//                 alt={cat.name}
//                 className="w-32 h-32 object-cover rounded-xl border"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 font-medium">
//                 New Image (Optional)
//               </label>

//               <input
//                 type="file"
//                 ref={imgRef}
//                 className="w-full border rounded-lg p-3"
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
//             >
//               Update Category
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { Axiosinstance, helper } from "@/app/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function EditCategory() {
const params = useParams();
const category_id = params.category_id || params.id;

const router = useRouter();

const [cat, setCat] = useState(null);
const [loading, setLoading] = useState(true);

const nameRef = useRef();
const slugRef = useRef();
const imgRef = useRef();

useEffect(() => {
if (!category_id) return;

Axiosinstance.get(`category/get/${category_id}`)
  .then((res) => {
    setCat(res.data.data);
  })
  .catch((err) => {
    console.log(err);
    toast.error("Category not found");
  })
  .finally(() => {
    setLoading(false);
  });


}, [category_id]);

const createSlug = () => {
slugRef.current.value = helper(nameRef.current.value);
};

const submitHandler = async (e) => {
e.preventDefault();

try {
  const form = new FormData();

  form.append("name", nameRef.current.value);
  form.append("slug", slugRef.current.value);

  if (imgRef.current.files[0]) {
    form.append("image", imgRef.current.files[0]);
  }

  await Axiosinstance.put(
    `category/update/${category_id}`,
    form
  );

  toast.success("Category Updated");

  router.push("/admin/category");
} catch (error) {
  console.log(error);
  toast.error("Update Failed");
}


};

if (loading) {
return ( <div className="p-10 text-center text-gray-500">
Loading... </div>
);
}

if (!cat) {
return ( <div className="p-10 text-center text-red-500">
Category Not Found </div>
);
}

return ( <div className="min-h-screen bg-slate-100 p-6"> <div className="max-w-3xl mx-auto"> <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

      <div className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Edit Category
        </h2>

        <Link
          href="/admin/category"
          className="bg-white text-slate-800 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={submitHandler}
        className="p-6 space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            Category Name
          </label>

          <input
            defaultValue={cat.name}
            ref={nameRef}
            onChange={createSlug}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            defaultValue={cat.slug}
            ref={slugRef}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Current Image
          </label>

          <img
            src={cat.image}
            alt={cat.name}
            className="w-32 h-32 object-cover rounded-xl border"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Image (Optional)
          </label>

          <input
            type="file"
            ref={imgRef}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Update Category
        </button>
      </form>
    </div>
  </div>
</div>


);
}
