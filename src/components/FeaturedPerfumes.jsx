


import React from "react";
import { perfumes } from "../data/perfumes";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";



const FeaturedPerfumes = () => {
  const { dispatch } = useCart();
  return (
    <section className="py-24 relative z-20">
      <h2 className="text-4xl md:text-5xl font-display font-light text-luxurySilver mb-14 text-center tracking-wide">Featured Perfumes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
        {perfumes.map((perfume, idx) => (
          <motion.div
            key={perfume.id}
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{ duration: 1.1, delay: idx * 0.18, ease: [0.4, 0.2, 0.2, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            className="group bg-luxurySurface/80 rounded-2xl overflow-hidden shadow-lg transition-shadow duration-700 cursor-pointer relative backdrop-blur-md border border-luxurySilver/30"
          >
            <motion.img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl border-2 border-[#38BDF8]/40 shadow"
              initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
              whileInView={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, delay: idx * 0.22, ease: [0.4, 0.2, 0.2, 1] }}
              viewport={{ once: true, amount: 0.5 }}
            />
            <div className="p-7 flex flex-col items-center">
              <motion.h3
                className="text-2xl font-display font-light text-[#C0C0C0] mb-2 group-hover:text-[#38BDF8] transition-all tracking-wide drop-shadow"
                initial={{ opacity: 0, y: 30, color: '#C0C0C0' }}
                whileInView={{ opacity: 1, y: 0, color: '#38BDF8' }}
                transition={{ duration: 0.8, delay: idx * 0.22 + 0.2 }}
                viewport={{ once: true, amount: 0.7 }}
              >
                {perfume.name}
              </motion.h3>
              <motion.p
                className="text-lg mb-4 text-[#38BDF8] font-semibold drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.22 + 0.3 }}
                viewport={{ once: true, amount: 0.7 }}
              >
                ${perfume.price}
              </motion.p>
              <motion.button
                className="px-7 py-2 rounded-full border-2 border-[#38BDF8] text-[#C0C0C0] font-semibold bg-[#0F172A]/60 backdrop-blur-md shadow hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300 mt-2"
                whileHover={{ scale: 1.12, backgroundColor: '#38BDF8', color: '#0F172A', borderColor: '#C0C0C0' }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => dispatch({ type: "ADD_TO_CART", product: perfume })}
              >
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPerfumes;
