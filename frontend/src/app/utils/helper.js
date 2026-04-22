import axios from "axios";

export function helper(str) {
  return str
    .toLowerCase()                      // lowercase me convert
    .replace(/[^a-z0-9\s-]/g, "")       // sirf a-z, 0-9, space, - rakho
    .trim()                             // extra space trim
    .replace(/\s+/g, "-")               // space ko "-"
    .replace(/-+/g, "-");               // multiple "-" ko single "-"
}

const getCokies = (name)=>{
    if (typeof document=== 'undefined') return null
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length===2) return parts.pop().split(';').shift();
    return null;
}

function formatCurrencyINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const Axiosinstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
   withCredentials: true
});

export {Axiosinstance,getCokies,formatCurrencyINR}