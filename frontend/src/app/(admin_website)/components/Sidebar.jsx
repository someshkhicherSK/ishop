
import Link from "next/link";
import { MdCategory,MdOutlineProductionQuantityLimits } from "react-icons/md";
import { LayoutDashboard, Settings } from "lucide-react";
import { AiOutlineBgColors } from "react-icons/ai";
import { TbBrandShazam } from "react-icons/tb";

const Sidebar = () => {
  return (
    <section className="w-64 bg-white">
      <div className="p-4 text-2xl font-bold border-b">Admin</div>
      <nav className="p-4 space-y-2">
        <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <LayoutDashboard className="w-5 h-5" /> Dashboard
        </Link>
        <Link href="/admin/category" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <MdCategory className="w-5 h-5" /> Category
        </Link>
        <Link href="/admin/color" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <AiOutlineBgColors className="w-5 h-5" /> Colors
        </Link>
        <Link href="/admin/brands" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <TbBrandShazam className="w-5 h-5" /> Brands
        </Link>
        <Link href="/admin/product" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <MdOutlineProductionQuantityLimits className="w-5 h-5" /> Product
        </Link>
        <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200">
          <Settings className="w-5 h-5" /> Settings
        </Link>
      </nav>
    </section>
  );
};

export default Sidebar;
