// "use client";
// import React, { useEffect, useState } from "react";
// import Logo from "./Logo";
// import Link from "next/link";
// import { CiHeart } from "react-icons/ci";

// import { FaBars, FaTimes } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { emptyCart, lsCartItem } from "@/app/redux/features/cartSlice";
// import { ShoppingCart } from "lucide-react";
// import { lsUserData, signOut } from "@/app/redux/features/userSlice";
// import { toast } from "react-toastify";
// import { formatCurrencyINR } from "@/app/utils/helper";

// const Links = [
//   { path: "/", name: "Home" },
//   { path: "/about", name: "About" },
//   { path: "/store", name: "Store" },
//   { path: "/contact", name: "Contact" },
//   { path: "/profile", name: "My Profile" },
// ];

// function Nav() {
//   const cartitems = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.user.userDetails)
//   const [open, setOpen] = useState(false);
//   const dispatcher = useDispatch()
//   const { items, finalPrice_Total } = cartitems;
//   useEffect(() => {
//     dispatcher(lsCartItem())
//     dispatcher(lsUserData())
//   }, [dispatcher])

//   const longout = () => {
//     dispatcher(emptyCart())
//     dispatcher(signOut())
//     toast.success("Sign out Successful...");
//     setOpen(false)
//   }


//   return (
//     <div className="p-4 bg-white flex flex-col gap-y-8 pb-6  relative z-50">


//       {/* Navbar */}
//       <nav className="flex justify-between items-center">
//         {/* Left part */}
//         <div className="flex flex-1  items-center gap-x-10 ">
//           <Logo />

//           {/* Desktop Links */}
//           <div className="hidden md:flex   flex-1 justify-center  items-center text-base gap-x-6 ">
//             {Links.map((link, index) => (
//               <Link
//                 href={link.path}
//                 key={index}
//                 className="font-semibold hover:text-blue-600 transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Right part (Desktop only) */}
//         <div className="hidden md:flex gap-x-6 items-center ">
//           <div className="flex gap-x-3">
//             <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
//             <button className="w-7 h-7 rounded-full bg-[#EBEEF6] flex justify-center items-center">
//               <CiHeart />
//             </button>
//             <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
//           </div>

//           <div className="flex flex-col text-[12px] uppercase gap-y-0">
//             <p>welcome</p>
//             {
//               user
//                 ?
//                 <h1 className="font-bold text-center">{user.name}</h1>
//                 :
//                 <Link href={'/user-login?rfe=/'}>
//                   <h1 className="font-bold">log in / Register</h1>
//                 </Link>
//             }
//           </div>

//           <Link href={"/cart"}>
//             <div className="flex items-center gap-x-3 bg-white rounded-full px-4 py-2  hover:shadow-lg transition duration-300 cursor-pointer">
//               {/* Cart Icon + Badge */}
//               <div className="relative">
//                 <ShoppingCart className="w-6 h-6 text-[#1ABA1A]" />
//                 {items.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-[#1ABA1A] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
//                     {items.length}
//                   </span>
//                 )}
//               </div>

//               {/* Cart Info */}
//               <div className="flex flex-col text-[12px] uppercase leading-tight">
//                 <span className="text-gray-500">Cart</span>
//                 <span className="font-bold text-gray-800">${finalPrice_Total || 0}</span>
//               </div>
//             </div>
//           </Link>

//         </div>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="md:hidden flex items-center">
//           <button onClick={() => setOpen(!open)} className="text-2xl">
//             {open ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//         onClick={() => setOpen(false)}
//       ></div>

//       {/* Mobile Sidebar Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-y-6 ${open ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         {/* Logo + Close Btn */}
//         <div className="flex justify-between items-center mb-4">
//           <Logo />
//           <button onClick={() => setOpen(false)}>
//             <FaTimes size={20} />
//           </button>
//         </div>

//         <div className="flex flex-col text-[12px] justify-center items-center uppercase gap-y-0">
//           <p>welcome</p>
//           {
//             user
//               ?
//               <h1 className="font-bold ">{user.name}</h1>
//               :
//               <Link href={'/user-login?rfe=/'}>
//                 <h1 className="font-bold">log in / Register</h1>
//               </Link>
//           }
//         </div>

//         {/* Nav Links */}
//         <div className="flex flex-col gap-y-4">
//           {Links.map((link, index) => (
//             <Link
//               href={link.path}
//               key={index}
//               className="font-semibold text-gray-700 hover:text-blue-600 transition-colors"
//               onClick={() => setOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//         <Link 
//         onClick={() => setOpen(false)}
//         href={"/cart"}>
//           <div className="flex items-center gap-x-3 bg-white   py-2   transition duration-300 cursor-pointer">
//             {/* Cart Icon + Badge */}
//             <div className="relative">
//               <ShoppingCart className="w-6 h-6 text-[#1ABA1A]" />
//               {items.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-[#1ABA1A] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
//                   {items.length}
//                 </span>
//               )}
//             </div>

//             {/* Cart Info */}
//             <div className="flex gap-x-5 text-[12px] uppercase leading-tight">
//               <span className="text-gray-500">Cart</span>
//               <span className="font-bold text-gray-800">{formatCurrencyINR(finalPrice_Total) || 0}</span>
//             </div>
//           </div>
//         </Link>
//         <div className="flex justify-start my-2">
//           {
//             user ?
//               <button
//                 onClick={longout}
//                 className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-teal-500 ">
//                 <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-teal-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
//                 <span className="relative text-teal-500 transition duration-300 group-hover:text-white ease">Sign out</span>
//               </button>
//               :
//               <Link href={'/user-login'}
//               onClick={() => setOpen(false)}
//               >
//               <button
//                 className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-teal-500 ">
//                 <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-teal-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
//                 <span className="relative text-teal-500 transition duration-300 group-hover:text-white ease">Login</span>
//               </button>
//               </Link>
//           }
//         </div>


//       </div>
//     </div>
//   );
// }

// export default Nav;
"use client";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, lsCartItem } from "@/app/redux/features/cartSlice";
import { ShoppingCart } from "lucide-react";
import { lsUserData, signOut } from "@/app/redux/features/userSlice";
import { toast } from "react-toastify";
import { formatCurrencyINR } from "@/app/utils/helper";

const Links = [
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/store", name: "Store" },
  { path: "/contact", name: "Contact" },
  { path: "/profile", name: "My Profile" },
];

function Nav() {
  const cartitems = useSelector((state) => state.cart || {});
  const user = useSelector((state) => state.user?.userDetails || null);

  // ✅ SAFE DEFAULTS
  const { items = [], finalPrice_Total = 0 } = cartitems;

  const [open, setOpen] = useState(false);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(lsCartItem());
    dispatcher(lsUserData());
  }, [dispatcher]);

  const logout = () => {
    dispatcher(emptyCart());
    dispatcher(signOut());
    toast.success("Sign out Successful...");
    setOpen(false);
  };

  return (
    <div className="p-4 bg-white flex flex-col gap-y-8 pb-6 relative z-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center">
        {/* Left */}
        <div className="flex flex-1 items-center gap-x-10">
          <Logo />

          <div className="hidden md:flex flex-1 justify-center items-center text-base gap-x-6">
            {Links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex gap-x-6 items-center">
          <div className="flex gap-x-3">
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6] flex justify-center items-center">
              <CiHeart />
            </button>
            <button className="w-7 h-7 rounded-full bg-[#EBEEF6]"></button>
          </div>

          <div className="flex flex-col text-[12px] uppercase gap-y-0">
            <p>welcome</p>
            {user ? (
              <h1 className="font-bold text-center">{user.name}</h1>
            ) : (
              <Link href={"/user-login?rfe=/"}>
                <h1 className="font-bold">log in / Register</h1>
              </Link>
            )}
          </div>

          <Link href={"/cart"}>
            <div className="flex items-center gap-x-3 bg-white rounded-full px-4 py-2 hover:shadow-lg transition duration-300 cursor-pointer">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[#1ABA1A]" />

                {items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1ABA1A] text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                    {items?.length}
                  </span>
                )}
              </div>

              <div className="flex flex-col text-[12px] uppercase leading-tight">
                <span className="text-gray-500">Cart</span>
                <span className="font-bold text-gray-800">
                  {formatCurrencyINR(finalPrice_Total)}
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setOpen(!open)} className="text-2xl">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform z-50 p-6 flex flex-col gap-y-6 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <Logo />
          <button onClick={() => setOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col text-[12px] justify-center items-center uppercase">
          <p>welcome</p>
          {user ? <h1 className="font-bold">{user.name}</h1> : null}
        </div>

        <div className="flex flex-col gap-y-4">
          {Links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={() => setOpen(false)}
              className="font-semibold text-gray-700 hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link href={"/cart"} onClick={() => setOpen(false)}>
          <div className="flex items-center gap-x-3 py-2">
            <ShoppingCart className="w-6 h-6 text-[#1ABA1A]" />
            <span>{items?.length || 0}</span>
          </div>
        </Link>

        <div>
          {user ? (
            <button onClick={logout} className="border p-2">
              Sign out
            </button>
          ) : (
            <Link href={"/user-login"} onClick={() => setOpen(false)}>
              <button className="border p-2">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
