'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaBox, FaHome, FaLock, FaUser, FaUserLock } from "react-icons/fa"
import { Axiosinstance } from "@/app/utils/helper";
import { toast } from "react-toastify";
import { addTouser, signOut } from "@/app/redux/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { emptyCart } from "@/app/redux/features/cartSlice";




function Page() {
  const router = useRouter()
  const [toggle, setToggle] = useState('account');
  const [userOrder, setUserOrder] = useState([])
  const [add, setAdd] = useState(false)
  const dispatcher = useDispatch()
  const user = useSelector((state) => state.user)

  const getOrder = async (api) => {
    const orders = await Axiosinstance.get(`order/order-get/${api}`);
    const data = await orders.data
    setUserOrder(data)
  }

  useEffect(() => {
    if (user?.userDetails?._id != null) {
      getOrder(user?.userDetails?._id)
    }
  }, [user])


  const Buttons = ({ tab, flag }) => {
    return (
      <button
        onClick={() => setToggle(flag)}
        className={`cursor-pointer w-full flex items-center justify-between px-4 py-3 rounded-lg ${flag === toggle ? "bg-teal-500 text-white" : " bg-gray-100"}`}
      >
        <span>{tab}</span>
        <span>→</span>
      </button>
    );
  };

  const addresshandler = (e) => {
    e.preventDefault();
    const data = {
      addressLine1: e.target.addressLine1.value,
      addressLine2: e.target.addressLine2.value,
      city: e.target.city.value,
      contact: e.target.contact.value,
      state: e.target.state.value,
      country: e.target.country.value,
      zip: e.target.zip.value,
    }
    if (!user?.userDetails) {
      setTimeout(() => {
        router.push('/user-login')
      }, 3000);
      return toast.error("Please Login Now...")
    }
    Axiosinstance.post(`user/address/${user?.userDetails?._id}`, data).then((res) => {
      if (res.status == 200) {
        const current = user || null
        console.log(res.data.user, "res")
        dispatcher(addTouser({ user: res.data.user, token: current.token, atLogin: current.atLogin }))
        setAdd(false)
        toast.success(res.data.msg)
      }

    }).catch((error) => {
      console.log(error)
      setAdd(false)
      toast.info(error.response.data.msg)
    })


  }

  const addressDelete = (index) => {
    Axiosinstance.delete(`user/add_delete/${index}/${user?.userDetails?._id}`).then((res) => {
      if (res.status == 200) {
        const current = user || null
        dispatcher(addTouser({ user: res.data.user, token: current.token, atLogin: current.atLogin }))
        toast.success(res.data.msg)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  const updatePassword = (e) => {
    e.preventDefault()
    const curr_pass = e.target.currentpass.value;
    const new_pass = e.target.newpass.value;
    const confirm_pass = e.target.confirmpass.value;
    if (new_pass != confirm_pass) {
      return toast.info('both  password shoud bhi same')
    }
    const data = {
      curr_pass,
      new_pass
    }
    Axiosinstance.patch(`/user/password/${user?.userDetails?._id}`, data).then((res) => {
      if (res.status == 200) {
        toast.success(res.data.msg)
        e.target.currentpass.value = ""
        e.target.confirmpass.value = ""
        e.target.newpass.value = ""
      }
    }).catch((error) => {
      console.log(error.response)
      if (error.response.status == 404) {
        toast.info(error.response.data.msg)
      } else if (error.response.status == 400) {
        toast.error(error.response.data.msg)
      }
    })
  }
  const longout = () => {
    dispatcher(emptyCart())
    dispatcher(signOut())
    toast.success("Sign out Successful...");
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row w-full max-w-7xl overflow-hidden">

        {/* 🟩 Mobile Header (only visible on mobile) */}
        <div className="md:hidden flex items-center justify-between bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4 rounded-t-xl">
          <div className="flex items-center gap-3">
            {user ? (
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-white"
              />
            ) : (
              <FaUserLock className="text-3xl" />
            )}
            <div>
              <h2 className="text-sm font-semibold leading-tight">
                {user?.userDetails?.name || "Guest User"}
              </h2>
              <p className="text-xs opacity-80">{user?.userDetails?.email || "Login Required"}</p>
            </div>
          </div>
          {user?.userDetails ? (
            <button
              onClick={longout}
              className="bg-white text-teal-600 px-3 py-1 text-xs rounded-full font-medium hover:bg-gray-100"
            >
              Logout
            </button>
          )
            :
           ( <Link href={'/user-login'}>
              <button
                className="bg-white text-teal-600 px-3 py-1 text-xs rounded-full font-medium hover:bg-gray-100"
              >
                Login
              </button>
            </Link>)
          }
        </div>

        {/* 🟨 Left Sidebar (desktop only) */}
        <div className="hidden md:flex md:w-1/3 border-r border-gray-300 p-6 flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4 flex justify-center items-center">
            {user ? (
              <img
                src="profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserLock className="text-blue-600 text-7xl drop-shadow-lg" />
            )}
          </div>

          {user?.userDetails ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.userDetails?.name || "User Not Found"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{user?.userDetails?.email}</p>
            </>
          ) : (
            <h2 className="text-xl font-bold text-gray-800 mb-3">Login Required</h2>
          )}

          <div className="space-y-3 w-full">
            <Buttons tab={"Account info"} flag={"account"} />
            <Buttons tab={"My order"} flag={"order"} />
            <Buttons tab={"My address"} flag={"address"} />
            <Buttons tab={"Change password"} flag={"password"} />
          </div>
        </div>

        {/* 🟦 Mobile Bottom Navbar */}
        <div className="fixed bottom-0 left-0 right-0  shadow-md border-t border-gray-200 md:hidden flex justify-around py-2 z-50 bg-gradient-to-r from-teal-500 to-blue-600 ">
          <button onClick={() => setToggle("account")} className={`flex flex-col items-center text-xs ${toggle === "account" ? "text-teal-600" : "text-white"}`}>
            <FaUser className="text-lg mb-1" />
            Account
          </button>
          <button onClick={() => setToggle("order")} className={`flex flex-col items-center text-xs ${toggle === "order" ? "text-black" : "text-white"}`}>
            <FaBox className="text-lg mb-1" />
            Orders
          </button>
          <button onClick={() => setToggle("address")} className={`flex flex-col items-center text-xs ${toggle === "address" ? "text-black" : "text-white"}`}>
            <FaHome className="text-lg mb-1" />
            Address
          </button>
          <button onClick={() => setToggle("password")} className={`flex flex-col items-center text-xs ${toggle === "password" ? "text-black" : "text-white"}`}>
            <FaLock className="text-lg mb-1" />
            Password
          </button>
        </div>

        {/* 🟪 Right Section (Content Area) */}
        <div className="w-full md:w-2/3 p-4 sm:p-6 md:p-8 mt-2 md:mt-0 mb-14 md:mb-0">
          <AnimatePresence mode="wait">
            {toggle === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user?.userDetails ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Account Info</h2>
                      <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Vikash"
                              defaultValue={user?.userDetails?.name.split(" ")[0] || "frist name"}
                              readOnly
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              readOnly
                              defaultValue={user?.userDetails?.name.split(" ")[1] || "last name"}
                              placeholder="Kumar"
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            defaultValue={user?.userDetails?.email || "email not found.."}
                            placeholder="vikash123@gmail.com"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>


                      </form>
                      <div className="flex justify-end my-2">
                        <button
                          onClick={longout}
                          className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-teal-500 ">
                          <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-teal-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                          <span className="relative text-teal-500 transition duration-300 group-hover:text-white ease">Sign out</span>
                        </button>
                      </div>
                    </div>
                    :
                    <UserLoginUi />
                }
              </motion.div>

            )}
            {toggle === 'order' && (

              <motion.div
                key="order"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user?.userDetails ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
                      <div className="space-y-4">

                        {
                          userOrder.order?.map((item, index) => {
                            return (
                              <div key={index} className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="font-medium text-gray-800">Order  #{item._id}</h3>
                                  <span className="text-sm text-teal-600">Delivered</span>
                                </div>
                                <p className="text-sm text-gray-600">{item?.product_Details[0]?.product_id?.name}</p>
                                <p className="text-sm text-gray-500 mt-1">Placed on: {item?.createdAt}</p>
                              </div>
                            )
                          })
                        }

                      </div>
                    </div>
                    :
                    <UserLoginUi />
                }
              </motion.div>
            )}
            {toggle === 'address' && (

              <motion.div
                key="address"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >

                {
                  user?.userDetails ?
                    <div className=" relative">
                      <div className="bg-white ">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h2 className="text-xl font-semibold">My Shipping Addresses</h2>
                            <p className="text-sm text-gray-500">Manage your saved addresses</p>
                          </div>
                          <button
                            onClick={() => setAdd(true)}
                            className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700"
                            aria-label="Add new address"
                          >
                            + Add Address
                          </button>
                        </div>

                        {/* Addresses list (static - no logic) */}
                        <div className="space-y-4">

                          {user?.userDetails?.shipping_address?.map((item, index) => {
                            return (
                              <div key={index + 1} className="border rounded-xl p-4 flex items-start gap-4 opacity-90">
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                                    {item.city?.charAt(0).toUpperCase()}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="text-sm font-semibold">Home</h3>
                                      <p className="text-xs text-gray-500">{user?.userDetails?.name} • {item.contact} </p>
                                    </div>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                                  </div>

                                  <p className="mt-2 text-sm text-gray-700">
                                    {item.addressLine1}, {item.addressLine2}, {item.city}, {item.state} - {item.zip}
                                  </p>

                                  <div className="mt-3 flex gap-2">
                                    <button
                                      onClick={() => addressDelete(index)}
                                      className="text-sm px-3 py-1 rounded-md border border-red-200 cursor-pointer text-red-600 hover:bg-red-50">Delete</button>
                                  </div>
                                </div>

                              </div>
                            )
                          })}

                        </div>

                        <p className="mt-5 text-xs text-gray-500">You can save up to 3 addresses. Click on an address to delete or edit it.</p>
                      </div>


                      {/* form Address */}

                      {
                        add && <motion.div
                          className="absolute w-full h-full top-0 transition-all left-0 bg-white"
                          initial={{ opacity: 0, x: 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: .3 }}
                        >
                          <form action="/submit-address" method="POST" onSubmit={addresshandler} >
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                              Shipping Address
                            </h2>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                              <div className="col-span-3">
                                <label
                                  htmlFor="addressLine1"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Address Line 1
                                </label>
                                <input
                                  type="text"
                                  id="addressLine1"
                                  name="addressLine1"
                                  required
                                  placeholder="House no, Street name"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div className="col-span-3">
                                <label
                                  htmlFor="addressLine2"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Address Line 2
                                </label>
                                <input
                                  type="text"
                                  id="addressLine2"
                                  name="addressLine2"
                                  placeholder="Near Landmark (optional)"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  required
                                  placeholder="JHUNJHUNUN"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  State
                                </label>
                                <input
                                  type="text"
                                  id="state"
                                  name="state"
                                  required
                                  placeholder="Rajasthan"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  id="country"
                                  name="country"
                                  required
                                  placeholder="India"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="zip"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  ZIP Code
                                </label>
                                <input
                                  type="text"
                                  id="zip"
                                  name="zip"
                                  required
                                  placeholder="333704"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="contact"
                                  className="block text-sm font-medium text-gray-600"
                                >
                                  Contact
                                </label>
                                <input
                                  type="text"
                                  id="contact"
                                  name="contact"
                                  placeholder="78945612123"
                                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                              </div>
                              <div >
                                <button
                                  type="submit"
                                  className="w-full py-3 my-4 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            <div className="my-2 flex justify-end">
                              <button className="py-1 px-4 bg-red-600 rounded-[7px] text-white font-semibold cursor-pointer" onClick={() => setAdd(false)}>Close</button>
                            </div>
                          </form>
                        </motion.div>
                      }
                    </div>
                    :
                    <UserLoginUi />
                }

              </motion.div>

            )}
            {toggle === 'password' && (

              <motion.div
                key="password"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {
                  user?.userDetails ?
                    <div>
                      <h2 className="text-2xl font-semibold mb-6">Change Password</h2>
                      <form className="space-y-5" onSubmit={updatePassword}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            name="currentpass"
                            required
                            placeholder="Enter current password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            name="newpass"
                            required
                            placeholder="Enter new password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            name="confirmpass"
                            required
                            placeholder="Confirm new password"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition"
                        >
                          Update Password
                        </button>
                      </form>
                    </div>
                    :
                    <UserLoginUi />
                }


              </motion.div>

            )}

          </AnimatePresence>
        </div>
      </div>
    </div>

  );
}

export default Page;


const UserLoginUi = () => {
  return (
    <div className="flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className=" rounded-2xl p-10 text-center w-full "
      >

        <motion.div
          initial={{ y: -15 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
          className="flex justify-center mb-6"
        >
          <FaUserLock className="text-blue-600 text-7xl drop-shadow-lg" />
        </motion.div>


        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Login Required
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-base mb-8">
          Please login to access your account and continue exploring.
        </p>

        {/* Button */}
        <Link href={'/user-login?rfe=/profile'}
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Login Now
        </Link>
      </motion.div>
    </div>
  )
}