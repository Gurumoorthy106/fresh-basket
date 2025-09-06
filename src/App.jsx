import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProductCard from "./components/Productcard";
import { products } from "./data/Products";
import Footer from "./components/Footer";

export default function App() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const filteredProducts =
    category === "All"
      ? shuffleArray(products)
      : products.filter((p) => p.category === category);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(135deg, #a8edea, #fed6e3, #a8edea)",
          backgroundSize: "400% 400%",
          zIndex: -1,
        }}
      />

      {/* Navbar */}
      <Navbar cartCount={cart.length} />

      {/* Category Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {["All", "Fruit", "Vegetable"].map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-5 py-2 rounded-full font-medium shadow-md transition-all duration-200 ${
              category === cat
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                : "bg-white/80 text-gray-800 hover:shadow-lg"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 flex-1"
      >
        <AnimatePresence>
          {currentProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} addToCart={addToCart} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center gap-3 mb-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-white/70 shadow-md disabled:opacity-40"
        >
          Prev
        </motion.button>
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i + 1}
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-xl shadow-md ${
              currentPage === i + 1
                ? "bg-emerald-500 text-white"
                : "bg-white/70 text-gray-800"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl bg-white/70 shadow-md disabled:opacity-40"
        >
          Next
        </motion.button>
      </div>

      {/* Footer */}
      <Footer cart={cart} totalPrice={totalPrice} removeFromCart={removeFromCart} />
    </div>
  );
}
