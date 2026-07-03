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
    <div
  className="
  relative
  w-full
  h-56
  sm:h-72
  md:h-96
  lg:h-[28rem]
  mb-8
  md:mb-12
  overflow-hidden
  rounded-xl
"
>
      <button onClick={prevSlide} className="
absolute
left-2
sm:left-4
top-1/2
-transform
-translate-y-1/2
bg-[#0F172A]/80
text-[#38BDF8]
w-9
h-9
sm:w-11
sm:h-11
rounded-full
flex
items-center
justify-center
shadow-lg
hover:bg-[#38BDF8]
hover:text-[#0F172A]
transition
z-10
">&#8592;</button>
     <img
src={images[current]}
alt={`Carousel ${current + 1}`}
className="
w-full
h-full
object-cover
object-center
transition-all
duration-700
"
/>
      <button onClick={nextSlide} className="
absolute
left-2
sm:left-4
top-1/2
-transform
-translate-y-1/2
bg-[#0F172A]/80
text-[#38BDF8]
w-9
h-9
sm:w-11
sm:h-11
rounded-full
flex
items-center
justify-center
shadow-lg
hover:bg-[#38BDF8]
hover:text-[#0F172A]
transition
z-10
">&#8594;</button>
      <div className="flex justify-center mt-3 gap-2 absolute bottom-3
sm:bottom-4 left-1/2 -translate-x-1/2">
        {images.map((_, idx) => (
          <span key={idx} className={`
w-2
h-2
sm:w-3
sm:h-3
rounded-full
transition-all
duration-300
${
idx===current
? "bg-[#38BDF8] scale-125"
: "bg-[#C0C0C0]"
}
`}></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
