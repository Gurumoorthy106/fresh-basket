{/* footer */}
<footer className="mt-auto bg-gradient-to-r from-emerald-600 to-green-700 text-white py-6 text-center relative overflow-hidden">
  <motion.div
    className="flex justify-center gap-6 mb-2"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform">
      📸 Instagram
    </a>
    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform">
      💬 WhatsApp
    </a>
    <a href="mailto:demo@example.com" className="hover:scale-125 transition-transform">
      ✉️ Email
    </a>
  </motion.div>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    © {new Date().getFullYear()} Fresh Basket — Demo checkout (no real payments)
  </motion.div>
</footer>
