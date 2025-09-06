// src/App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProductCard from "./components/Productcard";
import PaymentPage from "./pages/PaymentPage";
import { products } from "./data/Products";

export default function App() {
  // load cart from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [category, setCategory] = useState("Fruit"); // default view
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [showPayment, setShowPayment] = useState(false);

  const filtered = products.filter((p) => p.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const totalPrice = cart.reduce((s, it) => s + it.price * it.qty, 0);

  // called when payment completed (clears cart)
  const handleConfirmOrder = (order) => {
    // order contains user, method, cart, totalPrice
    console.log("ORDER (demo)", order);
    // clear cart and localStorage
    setCart([]);
    localStorage.removeItem("cart");
    setShowPayment(false);
  };

  // animated gradient style for full background
  const gradientStyle = {
    backgroundImage: "linear-gradient(120deg,#e6fffa,#b8f5d9,#5eead4)",
    backgroundSize: "300% 300%",
  };

  return (
    <motion.div className="min-h-screen relative overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* animated background gradient (moves via framer) */}
      <motion.div
        className="absolute inset-0 -z-20"
        style={gradientStyle}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* floating blobs */}
      <motion.div
        className="absolute top-16 left-8 w-72 h-72 bg-emerald-400/25 rounded-full blur-3xl -z-10"
        animate={{ x: [0, 50, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 right-8 w-96 h-96 bg-green-500/22 rounded-full blur-3xl -z-10"
        animate={{ x: [0, -60, 40, 0], y: [0, 40, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* page content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar cartCount={cart.length} />

        {/* category switch */}
        <div className="flex justify-center items-center gap-4 mt-6">
          {["Fruit", "Vegetable"].map((c) => (
            <motion.button
              key={c}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCategory(c); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full font-semibold shadow-md ${
                category === c ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white" : "bg-white text-gray-800"
              }`}
            >
              {c === "Fruit" ? "🍎 Fruits" : "🥕 Vegetables"}
            </motion.button>
          ))}
        </div>

        {/* product grid */}
        <main className="p-8 flex-1">
          <motion.h2 className="text-2xl font-bold mb-4 text-emerald-700">
            {category === "Fruit" ? "Fresh Fruits" : "Fresh Vegetables"}
          </motion.h2>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {pageProducts.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <ProductCard product={p} addToCart={addToCart} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* pagination */}
          <div className="flex justify-center gap-3 mt-8">
            <button type="button" onClick={() => setCurrentPage((v) => Math.max(v - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-white shadow">Prev</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} type="button" onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded-md ${currentPage === i + 1 ? "bg-emerald-500 text-white" : "bg-white"}`}>{i + 1}</button>
            ))}
            <button type="button" onClick={() => setCurrentPage((v) => Math.min(v + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-md bg-white shadow">Next</button>
          </div>
        </main>

        {/* cart panel */}
        <motion.aside initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 70 }} className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl p-4 z-40">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-lg">🛒 Cart</div>
            <div className="text-sm text-gray-500">{cart.length} items</div>
          </div>

          {cart.length === 0 ? (
            <div className="text-sm text-gray-500">Your cart is empty</div>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {cart.map((it) => (
                <li key={it.id} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-semibold">₹{it.price * it.qty}</div>
                    <button type="button" onClick={() => removeFromCart(it.id)} className="text-red-500 text-sm mt-1">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex items-center justify-between font-semibold">
            <div>Total</div>
            <div>₹{totalPrice}</div>
          </div>

          <motion.button whileHover={{ scale: 1.03 }} disabled={cart.length === 0} onClick={() => setShowPayment(true)} className="mt-4 w-full py-2 rounded-md bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold disabled:opacity-50">Checkout</motion.button>
        </motion.aside>

        {/* footer */}
        <footer className="mt-auto bg-gradient-to-r from-emerald-600 to-green-700 text-white py-4 text-center">
          <div>© {new Date().getFullYear()} Fresh Basket — Demo checkout (no real payments)</div>
        </footer>
      </div>

      {/* Payment overlay */}
      <AnimatePresence>
        {showPayment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PaymentPage
              cart={cart}
              totalPrice={totalPrice}
              onBack={() => setShowPayment(false)}
              onConfirm={handleConfirmOrder}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
