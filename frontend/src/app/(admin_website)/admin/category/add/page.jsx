"use client";

import { Axiosinstance, helper } from "@/app/utils/helper";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddCategory() {

  const router = useRouter();
  const nameRef = useRef();
  const slugRef = useRef();
  const imgRef = useRef();

  const createSlug = () => {
    slugRef.current.value = helper(nameRef.current.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", nameRef.current.value);
    form.append("slug", slugRef.current.value);
    form.append("image", imgRef.current.files[0]);

    Axiosinstance.post("category/create", form)
      .then(() => {
        toast.success("Category Added");
        router.push("/admin/category");
      })
      .catch(() => toast.error("Error"));
  };

  return (
    <div className="p-6">

      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Add Category</h2>
        <Link href="/admin/category">Back</Link>
      </div>

      <form onSubmit={submitHandler} className="space-y-4">

        <input
          ref={nameRef}
          onChange={createSlug}
          placeholder="Category Name"
          className="border p-2 w-full"
          required
        />

        <input
          ref={slugRef}
          placeholder="Slug"
          className="border p-2 w-full"
          required
        />

        <input type="file" ref={imgRef} required />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>

      </form>

    </div>
  );
}
