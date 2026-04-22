'use client'
import { Axiosinstance, getCokies, helper } from "@/app/utils/helper";
import Link from "next/link";
import { useRef, useState } from "react";
import Select from 'react-select'
import TextEditor from "./TextEditor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


export default function ProductForm({ category, brands, color }) {
    const router = useRouter();
    const [selClr, setSelCrl] = useState([]);
    const [longDesc, setLongDes] = useState('')
    const nameRfe = useRef(null);
    const slugRfe = useRef(null);
    const originalPriceRfe = useRef();
    const discoutRfe = useRef();
    const finalPriceRfe = useRef()

    const statusRfe = useRef(null);
    const stockRfe = useRef(null);
    const topsellingRfe = useRef(null);
    const imgRfe = useRef(null);


    const createSlug = () => {
        const slug = helper(nameRfe.current.value);
        slugRfe.current.value = slug;
    };
    const priceCalclute = () => {
        const op = originalPriceRfe.current.value;
        const dp = discoutRfe.current.value;
        const fp = op - (op * dp) / 100;
        finalPriceRfe.current.value = fp.toFixed();
    }
    const formHandler = (e) => {
        e.preventDefault();
        const token = getCokies('admin_token')
        const formData = new FormData();
        formData.append("name", nameRfe.current.value);
        formData.append("slug", slugRfe.current.value);
        formData.append("shortDescription", e.target.shortDescription.value);
        formData.append("longDescription", longDesc);
        formData.append("originalPrice", originalPriceRfe.current.value);
        formData.append("discountPercentage", discoutRfe.current.value);
        formData.append("finalPrice", finalPriceRfe.current.value);
        formData.append("categoryId", e.target.categoryId.value);
        formData.append("BrandId", e.target.BrandId.value);
        formData.append("colors", JSON.stringify(selClr));
        formData.append("thumbnail", e.target.thumbnail.files[0]);
        formData.append("stock", stockRfe.current.checked ? true : false);
        formData.append("topSelling", topsellingRfe.current.checked ? true : false);
        formData.append("status", statusRfe.current.checked ? true : false);
        //All Done !
        for (let img of e.target.images.files) {
            formData.append("images", img);
        }


        Axiosinstance.post("product/create", formData , {
            headers:{
                Authorization:token
            }
        }).then((res) => {
            if (res.status == 201) {
                toast.success(res.data.msg)
                setTimeout(() => {
                    router.push('/admin/product');
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



    return (
        <form
            onSubmit={formHandler}
            className="w-full mx-auto bg-white/80 backdrop-blur-xl  shadow-2xl rounded-2xl p-10 space-y-8 border border-gray-200">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
                🛍️ Create / Edit Product
            </h2>

            {/* Name + Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                        type="text"
                        name="name"
                        onChange={createSlug}
                        maxLength={50}
                        ref={nameRfe}
                        placeholder="e.g. iPhone 15"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Slug *</label>
                    <input
                        type="text"
                        ref={slugRfe}
                        readOnly
                        name="slug"
                        maxLength={60}
                        placeholder="iphone-15"
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                </div>
            </div>

            {/* Short + Long Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Long Description</label>
                    <TextEditor value={longDesc} changehandler={(data) => setLongDes(data)} />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <textarea
                        name="shortDescription"
                        maxLength={200}
                        rows="3"
                        placeholder="Quick intro..."
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    ></textarea>
                </div>
            </div>

            {/* Pricing */}
            <div>
                <h3 className="text-lg font-semibold mb-3">💰 Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Original Price</label>
                        <input
                            type="number"
                            ref={originalPriceRfe}
                            onChange={priceCalclute}
                            name="originalPrice"
                            defaultValue={200}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount %</label>
                        <input
                            type="number"
                            ref={discoutRfe}
                            onChange={priceCalclute}
                            name="discountPercentage"
                            defaultValue={5}
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Final Price</label>
                        <input
                            type="number"
                            ref={finalPriceRfe}
                            readOnly
                            name="finalPrice"
                            placeholder="Auto / Manual"
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Category & Brand & Colors*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Select
                        name="categoryId"
                        instanceId="category-select"
                        placeholder="-- Category Selector --"
                        options={
                            category?.data?.map((category) => {
                                return { value: category._id, label: category.name }
                            })
                        } />
                </div>

                {/* brand */}
                <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <Select
                        name="BrandId"
                        instanceId="Brands-select"
                        placeholder="-- Brands Selector --"
                        options={
                            brands?.data?.map((brand) => {
                                return { value: brand._id, label: brand.name }
                            })
                        } />
                </div>

                {/* Colors */}
                <div>
                    <label className="block text-sm font-medium mb-1">Colors</label>
                    <Select
                        instanceId="Colors-select"
                        isMulti
                        onChange={(data) => {
                            const color = data.map((ob) => ob.value)
                            setSelCrl(color);
                        }}
                        closeMenuOnSelect={false}
                        placeholder="-- Color Selector --"
                        options={
                            color.map((clr) => {
                                return { value: clr._id, label: clr.name }
                            })
                        } />
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl / Cmd to select multiple</p>
                </div>
            </div>



            {/* Thumbnail + Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {/* Thumbnail */}
                <div className="relative">
                    <label className="block text-sm font-medium mb-2">Thumbnail</label>
                    <div className="flex items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-500 transition">
                        {/* Placeholder Preview */}
                        <div className="text-center text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mx-auto h-12 w-12 mb-2 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <p className="text-sm">Upload Thumbnail</p>
                        </div>
                        <input
                            type="file"
                            name="thumbnail"
                            ref={imgRfe}
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Additional Images */}
                <div>
                    <label htmlFor="images" className="block text-sm font-medium mb-2">Additional Images
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {/* Placeholder Boxes */}
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-pink-500 transition"
                                >
                                    <div className="text-center text-gray-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mx-auto h-8 w-8 mb-1 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        <p className="text-xs">Add</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>


            {/* Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" ref={stockRfe} name="stock" defaultChecked className="accent-purple-600" />
                    In Stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" ref={topsellingRfe} name="topSelling" className="accent-purple-600" />
                    Top Selling
                </label>
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" ref={statusRfe} name="status" defaultChecked className="accent-purple-600" />
                    Active
                </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center flex gap-x-6 justify-end">
                <Link href='/admin/product'>
                    <div
                        className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 text-white font-semibold px-7 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Cancel
                    </div>
                </Link>


                <button
                    type="submit"
                    className="bg-gradient-to-r cursor-pointer from-purple-600 to-pink-500 text-white font-semibold px-7 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Save Product
                </button>
            </div>
        </form>
    );
}
