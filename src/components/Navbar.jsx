// src/components/Navbar.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Navbar({ cartCount }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 90 }}
      className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-4 shadow-xl flex justify-between items-center sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">🥬</div>
        <div>
          <div className="text-xl font-bold">Fresh Basket</div>
          <div className="text-xs opacity-90">Fruits & Vegetables</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-sm opacity-90">Free delivery over ₹999</div>
        <div className="font-semibold">Cart: {cartCount}</div>
      </div>
    </motion.nav>
  );
}
