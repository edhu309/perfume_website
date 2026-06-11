import React, { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";


const ScrollStory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products?section=discover").then((res) => setProducts(res.data)).catch(() => {});
  }, []);

  return (
  <section className="py-28 relative z-20">
    <h2 className="text-4xl md:text-5xl font-display font-light text-luxurySilver mb-8 text-center tracking-wide">Discover the Collection</h2>
    <div className="flex flex-col gap-24 max-w-3xl mx-auto">
      {products.map((perfume, idx) => (
        <motion.div
          key={perfume._id || perfume.id}
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          transition={{ duration: 1.1, delay: idx * 0.18, ease: [0.4, 0.2, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-10 bg-[#0F172A]/80 rounded-2xl p-10 border-2 border-[#38BDF8]/30 backdrop-blur-md shadow-lg"
        >
          <motion.img
            src={perfume.image}
            alt={perfume.name}
            className="w-48 h-48 object-cover rounded-xl border-2 border-[#C0C0C0]/40 shadow"
            initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: idx * 0.22, ease: [0.4, 0.2, 0.2, 1] }}
            viewport={{ once: true, amount: 0.5 }}
          />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-display font-light text-[#38BDF8] mb-2 tracking-wide drop-shadow">{perfume.name}</h3>
            <p className="text-[#C0C0C0] mb-2">{perfume.description}</p>
            <span className="inline-block px-4 py-1 border-2 border-[#38BDF8] text-[#C0C0C0] rounded-full text-sm font-semibold mt-2 bg-[#38BDF8]/10 backdrop-blur-md">
              {perfume.category}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
  );
};

export default ScrollStory;
