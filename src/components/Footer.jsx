import React from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";

export default function Footer({ cart, totalPrice, removeFromCart }) {
  return (
    <footer className="bg-gradient-to-r from-emerald-600 to-green-700 text-white py-6 text-center mt-10 relative z-10">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-lg mb-2"
      >
        🥬 Fresh Basket
      </motion.p>
      <p className="text-sm">© {new Date().getFullYear()} Fresh Basket. All rights reserved.</p>
      
      {/* Social Links */}
      <div className="flex justify-center gap-6 mt-3 text-xl">
        <a href="https://www.instagram.com/__gurumoorthy__/" target="_blank">
          <Instagram className="hover:text-yellow-200 transition" />
        </a>
        <a href="mailto:gurumoorthy2022004@gmail.com">
          <Mail className="hover:text-yellow-200 transition" />
        </a>
        <a href="https://wa.me/9952126336" target="_blank">
          <MessageCircle className="hover:text-yellow-200 transition" />
        </a>
      </div>

      {/* Payment / Cart Summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-5 bg-white/20 p-4 rounded-xl inline-block"
        >
          <h3 className="font-bold">Cart Summary</h3>
          <ul className="mb-2 space-y-1 max-h-40 overflow-y-auto">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-2">✕</button>
              </li>
            ))}
          </ul>
          <div className="font-semibold mt-2">Total: ₹{totalPrice}</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white py-2 rounded-xl shadow-lg"
          >
            Proceed to Pay
          </motion.button>
        </motion.div>
      )}
    </footer>
  );
}
