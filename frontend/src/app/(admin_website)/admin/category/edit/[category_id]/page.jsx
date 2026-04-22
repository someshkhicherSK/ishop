"use client";

import { Axiosinstance, helper } from "@/app/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function EditCategory() {

  const { category_id } = useParams();
  const router = useRouter();

  const [cat, setCat] = useState(null);

  const nameRef = useRef();
  const slugRef = useRef();
  const imgRef = useRef();

  useEffect(() => {
    Axiosinstance.get(`category/get/${category_id}`)
      .then(res => setCat(res.data.getCategory));
  }, []);

  const createSlug = () => {
    slugRef.current.value = helper(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", nameRef.current.value);
    form.append("slug", slugRef.current.value);
    if (imgRef.current.files[0]) {
      form.append("image", imgRef.current.files[0]);
    }

    Axiosinstance.put(`category/update/${category_id}`, form)
      .then(() => {
        toast.success("Updated");
        router.push("/admin/category");
      });
  };

  if (!cat) return null;

  return (
    <div className="p-6">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Edit Category</h2>
        <Link href="/admin/category">Back</Link>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">

        <input
          defaultValue={cat.name}
          ref={nameRef}
          onChange={createSlug}
          className="border p-2 w-full"
        />

        <input
          defaultValue={cat.slug}
          ref={slugRef}
          className="border p-2 w-full"
        />

        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/categoryImg/${cat.image}`}
          className="w-24"
        />

        <input type="file" ref={imgRef} />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>

      </form>

    </div>
  );
}
