"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-8 rounded-2xl shadow-2xl bg-black/40 backdrop-blur-lg border border-white/10 max-w-sm w-full"
      >
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0.8, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <Sparkles className="w-16 h-16 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]" />
            <motion.span
              className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="text-6xl font-extrabold mt-6 bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          404
        </motion.h1>

        <p className="mt-3 text-gray-300 text-lg">
          Lost in the digital cosmos 🌌  
        </p>
        <p className="text-sm text-gray-500 mt-1">
          The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 transition-all shadow-lg"
          >
            ⬅ Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
