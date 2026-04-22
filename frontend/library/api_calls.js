// import { Axiosinstance } from "@/app/utils/helper";

// const getCategory = async(id=null)=>{
//     let API = null
//     if (id==null) {
//         API = 'category/get';
//     }else{
//         API =  `category/get/${id}`;
//     }
//     const response =await Axiosinstance.get(API);
//     const data = await response.data;
//     return data
// }
// const getProduct = async(id=null,categorySlug=null,brandSlug=null,colorSlug=null,min=null,max=null)=>{
//     let API = null
//     if (id==null) {
//         API = 'product/get';
//     }else{
//         API =  `product/get/${id}`;
//     }
//     const query = new URLSearchParams()
//     if (categorySlug) {
//         query.append("categorySlug",categorySlug)
//     }
//     if (brandSlug) {
//         query.append("brandSlug",brandSlug)
//     }
//     if (colorSlug) {
//         query.append("colorSlug",colorSlug)
//     }
//      if (min) {
//         query.append("min",min)
//     }
//      if (max) {
//         query.append("max",max)
//     }
//     const response =await Axiosinstance.get(`${API}?${query.toString()}`);
//     const data = response.data;
//     return data.getProduct
// }

// const getColors = async(id=null) =>{
//     let API = null;
//     if (id==null) {
//         API= "/color/get"
//     }else{
//         API = `/color/get/${id}`
//     }
//     const res = await Axiosinstance(API);
//     const data = await res.data;
//     return data.getColor;

// }

// const getBrands = async(id=null)=>{
//     let API = null;
//     if (id==null) {
//         API = 'brands/get'
//     }else {
//         API = `brands/get/${id}`;
//     }
//     const res = await Axiosinstance(API);
//     const data = await res.data;
//     return data

// }
// export {getCategory,getColors,getBrands,getProduct}


import { Axiosinstance } from "@/app/utils/helper";

export const getCategory = async (id = null) => {
  try {
    const API = id ? `category/get/${id}` : "category/get";
    const res = await Axiosinstance.get(API);
    return res.data;
  } catch (e) {
    console.log("CATEGORY ERROR:", e.message);
    return [];
  }
};

export const getProduct = async (
  id = null,
  categorySlug = null,
  brandSlug = null,
  colorSlug = null,
  min = null,
  max = null
) => {
  try {
    const API = id ? `product/get/${id}` : "product/get";

    const query = new URLSearchParams();

    if (categorySlug) query.append("categorySlug", categorySlug);
    if (brandSlug) query.append("brandSlug", brandSlug);
    if (colorSlug) query.append("colorSlug", colorSlug);
    if (min) query.append("min", min);
    if (max) query.append("max", max);

    const res = await Axiosinstance.get(`${API}?${query}`);
    return res.data.getProduct || [];
  } catch (e) {
    console.log("PRODUCT ERROR:", e.message);
    return [];
  }
};

export const getColors = async (id = null) => {
  try {
    const API = id ? `color/get/${id}` : "color/get";
    const res = await Axiosinstance.get(API);
    return res.data.getColor || [];
  } catch (e) {
    console.log("COLOR ERROR:", e.message);
    return [];
  }
};

export const getBrands = async (id = null) => {
  try {
    const API = id ? `brands/get/${id}` : "brands/get";
    const res = await Axiosinstance.get(API);
    return res.data || [];
  } catch (e) {
    console.log("BRAND ERROR:", e.message);
    return [];
  }
};
