import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxSection = () => {
  // Parallax effect
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Move background image slowly (subtle parallax)
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#0F172A]"
      style={{ backgroundColor: "#0F172A" }}
    >
      {/* Parallax Background */}
      <motion.div
        style={{
          y,
          backgroundImage: 'url(/Rugged%20Elegance%20Perfume.png)', // URL-encoded for space
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" aria-hidden="true" />
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.6) 35%, rgba(15,23,42,0.6) 65%, rgba(15,23,42,0.95) 100%)"
        }}
        aria-hidden="true"
      />
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0.2, 0.2, 1] }}
          viewport={{ once: true, amount: 0.7 }}
          className="text-5xl md:text-7xl font-light tracking-widest text-[#E2E8F0] mb-8 drop-shadow-lg"
        >
          Crafted in Darkness
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.4, 0.2, 0.2, 1] }}
          viewport={{ once: true, amount: 0.7 }}
          className="text-lg md:text-2xl text-[#94A3B8] max-w-2xl mb-10 mx-auto"
        >
          A fragrance that defines presence and identity
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0.2, 0.2, 1] }}
          viewport={{ once: true, amount: 0.7 }}
          className="px-10 py-3 rounded-full border-2 border-[#C0C0C0] text-[#C0C0C0] font-semibold text-lg bg-white/5 backdrop-blur-md shadow-silver-glow transition-all duration-300 hover:bg-[#C0C0C0] hover:text-[#0F172A] focus:outline-none"
        >
          Discover More
        </motion.button>
      </div>
    </section>
  );
};

export default ParallaxSection;
