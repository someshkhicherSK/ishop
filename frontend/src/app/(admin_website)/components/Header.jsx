
import { Bell } from "lucide-react";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { MdCancel } from "react-icons/md";

const Header = ({toggel,setToggle}) => {
  
  return (
    <header className="flex justify-between items-center p-4 bg-white top-0 left-0 shadow sticky w-full z-10 ">
      <div className="md:hidden ">
        {
          toggel ?
            <button onClick={() => setToggle(false)}><CgMenuLeft size={35} /></button>
            :
            <button onClick={() => setToggle(true)}><MdCancel size={35} /></button>
            
        }
      </div>
      <Link href='/admin'> <h1 className="text-xl font-semibold">Dashboard</h1></Link>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
