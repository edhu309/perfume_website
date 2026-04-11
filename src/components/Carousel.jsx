import React, { useState, useEffect, useRef } from "react";

const Carousel = ({ images, autoSlide = false, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const timeoutRef = useRef(null);

  const nextSlide = () => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  useEffect(() => {
    if (!autoSlide) return;
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, autoSlide, interval, length]);

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="relative w-full h-[28rem] mb-12 overflow-hidden">
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#0F172A] text-[#38BDF8] px-4 py-2 rounded-full shadow hover:bg-[#38BDF8] hover:text-[#0F172A] transition z-10">&#8592;</button>
      <img src={images[current]} alt="carousel" className="w-full h-full object-cover" />
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0F172A] text-[#38BDF8] px-4 py-2 rounded-full shadow hover:bg-[#38BDF8] hover:text-[#0F172A] transition z-10">&#8594;</button>
      <div className="flex justify-center mt-3 gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
        {images.map((_, idx) => (
          <span key={idx} className={`w-3 h-3 rounded-full ${idx === current ? 'bg-[#38BDF8]' : 'bg-[#C0C0C0]'}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
