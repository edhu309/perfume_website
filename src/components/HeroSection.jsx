import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.4, 0.2, 0.2, 1] }}
      className="relative z-10 flex flex-col items-center text-center px-4"
    >
      <h1 className="text-[2.8rem] md:text-[5rem] font-display font-light tracking-wide text-luxurySilver mb-6 drop-shadow-silver-glow leading-tight">
        Define Your Scent
      </h1>
      <p className="text-lg md:text-2xl text-luxuryMuted mb-10 max-w-2xl font-sans">
        Discover the essence of modern luxury. Crafted for those who appreciate the art of fine fragrance.
      </p>
      <motion.button
        whileHover={{ scale: 1.07, backgroundColor: '#C0C0C0', color: '#0F172A' }}
        className="px-10 py-4 rounded-full border-2 border-luxurySilver text-luxurySilver font-semibold text-xl bg-white/5 backdrop-blur-md shadow-silver-glow transition-all duration-300 hover:bg-luxurySilver hover:text-luxuryBg focus:outline-none"
        style={{ boxShadow: '0 4px 32px 0 #C0C0C055, 0 1.5px 8px 0 #38BDF822' }}
      >
        Explore Collection
      </motion.button>
    </motion.div>
  </section>
);

export default HeroSection;
