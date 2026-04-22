"use client";
import { toast } from "react-toastify";
import { Axiosinstance } from "../utils/helper";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    Axiosinstance.post("/admin/login", data, { withCredentials: true })
      .then((res) => {
        if (res.data?.token) {
          document.cookie = `admin_token=${res.data.token}; path=/; max-age=${60 * 60 * 24}`;
        }
        toast.success(res.data.msg);
        setTimeout(() => router.push("/admin"), 500);
      })
      .catch((error) => {
        toast.warning(error.response?.data?.msg || "Login failed!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md mb-4">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-sm mt-1">Access your admin dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={loginHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="h-4 w-4 text-blue-500 rounded border-gray-300" />
              Remember me
            </label>
            <button type="button" className="text-blue-600 hover:underline">Forgot?</button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}
