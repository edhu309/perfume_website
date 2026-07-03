


import React, { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";



const FeaturedPerfumes = () => {
  const { dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products?section=featured");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
      <section
  className="
  py-14
  sm:py-16
  md:py-20
  lg:py-24
  relative
  z-20
"
>
        <h2 className="text-3xl
sm:text-4xl
md:text-5xl font-display font-light text-luxurySilver mb-8
sm:mb-10
md:mb-14 text-center tracking-wide">Featured Perfumes</h2>
        {loading ? (
          <div className="py-20 text-center text-xl text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : products.length === 0 ? (
          <div className="
text-center
text-gray-400
py-20
">No products found.</div>
        ) : (
          <div className="grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
sm:gap-8
lg:gap-12
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8">
            {products.map((perfume, idx) => {
              let imgSrc = perfume.image;
              return (
                <motion.div
                  key={perfume._id || perfume.id}
                  initial={{ opacity: 0, y: 80, scale: 0.92 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}
                  transition={{ duration: 1.1, delay: idx * 0.18, ease: [0.4, 0.2, 0.2, 1] }}
                  viewport={{ once: true, amount: 0.4 }}
                  className="group bg-[#1e293b] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
hover:-translate-y-2 transition-shadow duration-700 cursor-pointer relative backdrop-blur-md border border-[#38BDF8]/30"
                >
                  <motion.img
                  loading="lazy"
                    src={imgSrc}
                    alt={perfume.name}
                    className="w-full h-60
sm:h-64
md:h-72 object-cover group-hover:scale-105 transition-transform duration-700 rounded-xl border-2 border-[#38BDF8]/40 shadow"
                    initial={{ scale: 0.92, opacity: 0, filter: 'blur(8px)' }}
                    whileInView={{ scale: 1, opacity: 1, filter: 'blur(0)' }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="p-4
sm:p-5
md:p-6 flex flex-col gap-2">
                    <h3 className="text-xl
sm:text-2xl font-display text-[#C0C0C0] mb-2">{perfume.name}</h3>
                    <p className="text-[#C0C0C0] text-sm
leading-6 mb-2">{perfume.description}</p>
                    {perfume.notes && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Object.entries(perfume.notes).map(([noteType, notes]) => (
                          <span key={noteType} className="bg-blue-900/60 text-xs text-luxurySilver px-2 py-1 rounded">
                            {noteType.charAt(0).toUpperCase() + noteType.slice(1)}: {Array.isArray(notes) ? notes.join(", ") : notes}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-lg
sm:text-xl font-semibold text-[#38BDF8] mt-2">${perfume.price}</div>
                    <div
className="
flex
flex-col
sm:flex-row
gap-3
mt-4
"
>
                      <button
                        onClick={() => dispatch({ type: "ADD_TO_CART", product: perfume })}
                        className="flex-1 px-5
py-3 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => dispatch({ type: "ADD_TO_CART", product: perfume })}
                        className="flex-1 px-5
py-3 rounded-full border-2 border-[#38BDF8] text-[#0F172A] font-semibold bg-[#38BDF8] hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
  export default FeaturedPerfumes;
