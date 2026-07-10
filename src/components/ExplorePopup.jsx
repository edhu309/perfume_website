import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import CheckoutPopup from "./CheckoutPopup";

const ExplorePopup = ({ open, onClose, onRequireLogin }) => {
  const { dispatch } = useCart();
  const { user } = useUser();
  const handleBuyNow = (product) => {
    if (!user) {
      onRequireLogin();
      return;
    }

    setBuyNowProduct({
      ...product,
      quantity: 1,
    });

    setCheckoutOpen(true);
  };

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
      api
        .get("/products?section=explore")
        .then((res) => setProducts(res.data))
        .catch(() => {});
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-[200] pt-20 flex flex-col items-center justify-start bg-black/60 backdrop-blur-lg">
      <div className="w-full max-w-2xl mt-16 flex flex-col items-center">
        <div className="w-full flex items-center mb-8 relative">
          <input
            className="w-full px-6 py-3 rounded-full border-2 border-[#38BDF8] bg-[#0F172A] text-[#C0C0C0] text-xl focus:outline-none focus:border-[#38BDF8] shadow"
            placeholder="Search perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <button
            className="absolute right-4 text-3xl text-[#38BDF8] font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="w-full max-h-[60vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 pr-2">
          {filtered.length === 0 && (
            <div className="col-span-2 text-center text-[#38BDF8] text-lg">
              No perfumes found.
            </div>
          )}
          {filtered.map((perfume) => (
            <div
              key={perfume._id || perfume.id}
              className="bg-[#1e293b] rounded-2xl p-6 flex flex-col items-center border border-[#38BDF8]/30 shadow-lg"
            >
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-40 h-40 object-cover rounded-xl mb-4 border-2 border-[#38BDF8]/40"
              />
              <div className="text-2xl font-display text-[#C0C0C0] mb-1">
                {perfume.name}
              </div>
              <div className="text-[#38BDF8] font-semibold mb-2">
                ₹{perfume.price}
              </div>
              <div className="text-[#C0C0C0] text-center mb-4 text-sm">
                {perfume.description}
              </div>
              <div className="flex gap-3 w-full">
                <button
                  className="flex-1 px-4 py-2 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      product: perfume,
                    });
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 px-4 py-2 rounded-full border-2 border-[#38BDF8] text-[#0F172A] font-semibold bg-[#38BDF8] hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
                  onClick={() => {
                    handleBuyNow(perfume);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CheckoutPopup
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={user}
        cartItems={buyNowProduct ? [buyNowProduct] : []}
      />
    </div>
  );
};

export default ExplorePopup;
