// import axios from "axios";

// export function helper(str) {
//   return str
//     .toLowerCase()                    
//     .replace(/[^a-z0-9\s-]/g, "")       // sirf a-z, 0-9, space, - rakho
//     .trim()                             // extra space trim
//     .replace(/\s+/g, "-")               // space ko "-"
//     .replace(/-+/g, "-");               // multiple "-" ko single "-"
// }

// const getCokies = (name)=>{
//     if (typeof document=== 'undefined') return null
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length===2) return parts.pop().split(';').shift();
//     return null;
// }

// function formatCurrencyINR(amount) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     minimumFractionDigits: 0,
//   }).format(amount);
// }

// const Axiosinstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//    withCredentials: true
// });
// console.log("BASE URL =", process.env.NEXT_PUBLIC_API_BASE_URL);
// export {Axiosinstance,getCokies,formatCurrencyINR}/

import axios from "axios";

export function helper(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const getCokies = (name) => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }

  return null;
};

function formatCurrencyINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const Axiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

function getImageUrl(image, folder) {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return `${base}images/${folder}/${image}`;
}

export { Axiosinstance, getCokies, formatCurrencyINR, getImageUrl };