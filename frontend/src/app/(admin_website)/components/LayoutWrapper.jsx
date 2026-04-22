'use client'
import { useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"

function LayoutWrapper({children}) {
    const [toggel, setToggle] = useState(true)
    console.log(toggel)
    console.log(toggel)
    return (
        <>
            <Header setToggle={setToggle} toggel={toggel} />
            <div className="md:h-[82vh] md:overflow-hidden bg-white relative">
            <div onClick={()=>setToggle(true)} className={`md:hidden  w-[100%] h-[100%] bg-white fixed duration-300 transition-all top-0 ${toggel ?"left-[-100%]":"left-0"}`}><Sidebar /></div>
                <div className="md:flex h-full">
                    <div className="h-full md:block hidden"><Sidebar /></div>
                    <div className="w-full overflow-y-auto">{children}</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LayoutWrapper