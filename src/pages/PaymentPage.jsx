
// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PaymentPage({ cart, totalPrice, onBack, onConfirm }) {
  const [method, setMethod] = useState("Card");
  const [user, setUser] = useState({ name: "", email: "", phone: "", address: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // this is demo-only: in a real app you would call your payment API
    const order = { user, method, cart, totalPrice, date: new Date().toISOString() };
    // call parent to clear cart / finish checkout
    onConfirm(order);
    alert("Order placed (demo). Thank you!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      {/* animated background behind modal */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(120deg,#9ff9d0,#68e3b0,#34d399)",
          backgroundSize: "300% 300%",
          filter: "blur(36px)",
          opacity: 0.85,
        }}
      />

      <motion.div
        className="absolute top-20 left-[6%] w-72 h-72 bg-emerald-400/25 rounded-full blur-3xl -z-20"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ repeat: Infinity, duration: 14 }}
      />
      <motion.div
        className="absolute bottom-16 right-[6%] w-96 h-96 bg-green-500/22 rounded-full blur-3xl -z-20"
        animate={{ x: [0, -60, 60, 0], y: [0, 40, -40, 0] }}
        transition={{ repeat: Infinity, duration: 18 }}
      />

      {/* Modal */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Order summary */}
          <div className="border-r pr-4">
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {cart.length === 0 ? (
                <div className="text-sm text-gray-500">No items</div>
              ) : (
                cart.map((it) => (
                  <div key={it.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                    </div>
                    <div className="font-semibold">₹{it.price * it.qty}</div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="mt-4 w-full py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Back to shop
            </button>
          </div>

          {/* Right: Payment & user form */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Payment & Details</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                type="text"
                placeholder="Full name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
              <textarea
                required
                placeholder="Delivery address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                className="w-full p-3 border rounded-lg"
                rows="3"
              />

              <label className="block font-medium mt-2">Payment method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Card">Card (demo)</option>
                <option value="UPI">UPI (demo)</option>
                <option value="NetBanking">Net Banking (demo)</option>
                <option value="Wallet">Wallet (demo)</option>
                <option value="COD">Cash on Delivery</option>
              </select>

              {/* For demo, if COD show hint */}
              {method === "COD" && (
                <div className="text-sm text-gray-600 mt-1">
                  You chose Cash on Delivery. We will call or SMS to confirm delivery.
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                type="submit"
                className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow"
              >
                Place Order
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
