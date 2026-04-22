"use client";
import { Axiosinstance, helper } from "@/app/utils/helper";
import { PenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import { getColors } from "../../../../library/api_calls";


function EditCompo({ id, setEditflag, setFlag, flag }) {
    const [colors, setColors] = useState({});
    const nameRfe = useRef(null);
    const slugRfe = useRef(null);
    const statusRfe = useRef(null);

    const formHandler = (e) => {
        e.preventDefault();
        const name = nameRfe.current.value;
        const slug = slugRfe.current.value;
        const hexacode = e.target.hexacode.value;
        const status = statusRfe.current.checked ? true : false;
        const data = { name, slug, hexacode, status }
        Axiosinstance.put(`color/edit/${id}`, data).then((res) => {
            if (res.status == 201) {
                toast.success(res.data.msg)
                setFlag(!flag)
                setTimeout(() => {
                    setEditflag(false)
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


    useEffect(() => {
        const fetchData = async () => {
            const res = await getColors(id);
            setColors(res);
        };
        fetchData();
    }, []);





    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6 w-full">
            <div className="w-full  bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-2 mb-6">
                    <PenIcon className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Edit Colors</h1>
                </div>

                <form className="space-y-5" onSubmit={formHandler}>
                    {/* Colors Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Colors Name
                        </label>
                        <input
                            type="text"
                            required
                            defaultValue={colors.name}
                            ref={nameRfe}
                            onChange={createSlug}
                            placeholder="Enter category name"
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
                            defaultValue={colors.slug}
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
                        <button
                            onClick={() => setEditflag(false)}
                            type="button"
                            className="px-5 py-2 text-[12px] md:text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-[12px] md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            Update Colors
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );
}

export default EditCompo;
