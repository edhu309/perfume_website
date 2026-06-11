import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthFormPopup from "../components/AuthFormPopup";
import AdminAuthFormPopup from "../components/AdminAuthFormPopup";
import SuccessPopup from "../components/SuccessPopup";

const About = () => {
  const [authOpen, setAuthOpen] = React.useState(false);
  const [adminAuthOpen, setAdminAuthOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <NavBar onLoginClick={() => setAuthOpen(true)} onAdminLoginClick={() => setAdminAuthOpen(true)} />
      <AuthFormPopup open={authOpen} onClose={() => setAuthOpen(false)} setSuccessMsg={setSuccessMsg} />
      <AdminAuthFormPopup open={adminAuthOpen} onClose={() => setAdminAuthOpen(false)} setSuccessMsg={setSuccessMsg} />
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg("")} />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-light text-[#38BDF8] mb-4 tracking-wide">
            About Auramist
          </h1>
          <p className="text-xl text-[#C0C0C0] max-w-2xl mx-auto">
            Where luxury meets artistry — crafting fragrances that define who you are.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-display text-[#38BDF8] mb-4">Our Story</h2>
          <p className="text-[#C0C0C0] text-lg leading-relaxed mb-4">
            Auramist Perfumes was born from a passion for the art of fragrance. We believe that every person 
            deserves a scent that speaks to their soul — one that captures their essence and leaves a lasting 
            impression. Our journey began with a simple idea: to make luxury perfumery accessible to everyone, 
            without compromising on quality or craftsmanship.
          </p>
          <p className="text-[#C0C0C0] text-lg leading-relaxed">
            Each fragrance in our collection is carefully curated, blending the finest ingredients from around 
            the world. From rich oud and warm amber to fresh citrus and delicate florals, our perfumes are 
            designed to evoke emotions and create unforgettable memories.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-display text-[#38BDF8] mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-2">Premium Collection</h3>
              <p className="text-[#94A3B8]">
                Explore our handpicked selection of premium fragrances across categories — woody, fresh, 
                oriental, floral, citrus, and spicy. Each bottle is a masterpiece.
              </p>
            </div>
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-2">Custom Fragrances</h3>
              <p className="text-[#94A3B8]">
                Can't find your perfect scent? Request a custom fragrance crafted just for you. Share your 
                preferences and our experts will create a unique blend tailored to your taste.
              </p>
            </div>
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-2">Easy Ordering</h3>
              <p className="text-[#94A3B8]">
                Browse, add to cart, and place your order seamlessly. We connect you directly with our team 
                via WhatsApp for a personalized ordering experience.
              </p>
            </div>
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-2">Quality Guarantee</h3>
              <p className="text-[#94A3B8]">
                Every fragrance is tested for longevity, projection, and authenticity. We source only from 
                trusted suppliers to ensure you receive nothing but the best.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-display text-[#38BDF8] mb-6">How It Works</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8] text-[#0F172A] flex items-center justify-center font-bold text-lg shrink-0">1</div>
              <div>
                <h4 className="text-lg text-[#C0C0C0] font-semibold">Browse Our Collection</h4>
                <p className="text-[#94A3B8]">Explore our featured perfumes or search the full collection to find fragrances you love.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8] text-[#0F172A] flex items-center justify-center font-bold text-lg shrink-0">2</div>
              <div>
                <h4 className="text-lg text-[#C0C0C0] font-semibold">Add to Cart</h4>
                <p className="text-[#94A3B8]">Select your favorites and add them to your cart. You can also request a custom fragrance.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8] text-[#0F172A] flex items-center justify-center font-bold text-lg shrink-0">3</div>
              <div>
                <h4 className="text-lg text-[#C0C0C0] font-semibold">Place Your Order</h4>
                <p className="text-[#94A3B8]">Enter your delivery details and confirm your order. We'll connect you via WhatsApp for payment and tracking.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#38BDF8] text-[#0F172A] flex items-center justify-center font-bold text-lg shrink-0">4</div>
              <div>
                <h4 className="text-lg text-[#C0C0C0] font-semibold">Enjoy Your Scent</h4>
                <p className="text-[#94A3B8]">Receive your perfume at your doorstep and define your signature scent.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display text-[#38BDF8] mb-4">Why Choose Auramist?</h2>
          <ul className="text-[#C0C0C0] text-lg space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-[#38BDF8] text-xl">✦</span> Handpicked premium fragrances from around the world
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#38BDF8] text-xl">✦</span> Custom fragrance creation tailored to your preferences
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#38BDF8] text-xl">✦</span> Affordable luxury without compromise
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#38BDF8] text-xl">✦</span> Fast and reliable delivery
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#38BDF8] text-xl">✦</span> Personalized customer support via WhatsApp
            </li>
          </ul>
        </div>

        {/* Bottom Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="px-8 py-3 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold text-lg bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full border-2 border-[#38BDF8] text-[#0F172A] font-semibold text-lg bg-[#38BDF8] hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
