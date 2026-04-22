
"use client";
import StatsCard from "../components/StatsCard";
import OrdersTable from "../components/OrdersTable";
import CountUp from "react-countup";


import { ShoppingCart, DollarSign, Users, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Axiosinstance } from "@/app/utils/helper";

export default function HomePage() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    products: 0,
  });

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await Axiosinstance.get("dashboard/get");
        const data = await res.data;
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);


  return (
    <main className="p-6 mt-16 flex-1">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br bg-white rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-1">
            Loading Dashboard
            <span className="animate-bounce text-blue-500">.</span>
            <span className="animate-bounce [animation-delay:0.2s] text-blue-500">.</span>
            <span className="animate-bounce [animation-delay:0.4s] text-blue-500">.</span>
          </h2>
          <p className="text-sm text-gray-400 mt-2 animate-pulse">Preparing analytics & insights...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <StatsCard
              icon={ShoppingCart}
              title="Orders"
              value={<CountUp end={stats.orders} duration={2} />}
              color="text-blue-500"
            />
            <StatsCard
              icon={DollarSign}
              title="Revenue"
              value={<CountUp end={stats.revenue} duration={2} />}
              color="text-blue-500"
            />

            <StatsCard
              icon={DollarSign}
              title="Customers"
              value={<CountUp end={stats.customers} duration={2} />}
              color="text-purple-500"
            />
            <StatsCard
              icon={Package}
              title="Products"
              value={<CountUp end={stats.products} duration={2} />}
              color="text-orange-500"
            />
          </div>

          {/* Orders Table */}
          <OrdersTable />
        </>
      )}
    </main>
  );
}
