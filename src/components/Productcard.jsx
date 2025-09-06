// src/components/ProductCard.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, addToCart }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col backdrop-blur-md border border-gray-200"
    >
      {/* Product Image */}
      <motion.img
        src={product.image}
        alt={product.name}
        className="h-44 w-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 flex-grow">{product.category}</p>

        {/* Price + Add Button */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-emerald-600">
            ₹{product.price}
          </span>

          {/* ✅ Add Button with Cart Icon + Animation */}
          <motion.button
            onClick={() => addToCart(product)}
            whileTap={{ scale: 0.85, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md hover:from-emerald-600 hover:to-green-700 transition"
          >
            🛒 Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
