import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import CheckoutPopup from "./CheckoutPopup";

const Cart = ({ open, onClose, onRequireLogin }) => {
  const { cart, dispatch } = useCart();
  const { user } = useUser();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const handleCheckout = () => {
    if (!user) {
      if (onRequireLogin) {
        onRequireLogin();
      }
      return;
    }

    setCheckoutOpen(true);
  };
  if (!open) return null;

  if (cart.items.length === 0) {
    return (
      <div
        className="
  fixed
  top-20
  right-2
  left-2
  sm:left-auto
  sm:right-6
  md:right-8
  w-auto
  sm:w-[380px]
  max-h-[75vh]
  overflow-y-auto
  bg-luxurySurface/95
  rounded-2xl
  p-4
  sm:p-6
  shadow-silver-glow
  border
  border-luxurySilver/30
  backdrop-blur-md
  z-[90]
"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-2xl font-display font-semibold text-luxuryGlow">
            Your Cart
          </h3>

          <button
            onClick={onClose}
            className="text-lg sm:text-2xl text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <p className="text-luxuryMuted text-sm sm:text-lg">Cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="
  fixed
  top-20
  right-2
  left-2
  sm:left-auto
  sm:right-6
  md:right-8
  w-auto
  sm:w-[380px]
  max-h-[75vh]
  overflow-y-auto
  bg-luxurySurface/95
  rounded-2xl
  p-4
  sm:p-6
  shadow-silver-glow
  border
  border-luxurySilver/30
  backdrop-blur-md
  z-[90]
"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-2xl font-display font-semibold text-luxuryGlow tracking-wide drop-shadow">
            Your Cart
          </h3>

          <button
            onClick={onClose}
            className="text-lg sm:text-2xl text-red-400 hover:text-red-600 transition"
          >
            ✕
          </button>
        </div>
        <ul className="mb-6 divide-y divide-luxurySilver/20">
          {cart.items.map((item) => (
            <li
              key={item._id || item.id}
              className="flex items-center justify-between py-3 group"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg border border-luxurySilver/30 shadow"
                  />
                )}
                <div>
                  <span className="block text-sm sm:text-lg font-display text-luxuryText group-hover:text-luxuryGlow transition">
                    {item.name}
                  </span>
                  <span className="block text-luxuryMuted text-sm">
                    x{item.quantity}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-luxuryGlow font-semibold text-sm sm:text-lg">
                  ₹{item.price * item.quantity}
                </span>
                <button
                  className="mt-1 text-xs text-red-400 hover:text-white hover:bg-red-400 px-2 py-1 rounded transition"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      id: item._id || item.id,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm sm:text-lg text-luxuryMuted font-medium">Total:</span>
          <span className="text-lg sm:text-2xl font-display text-luxuryGlow font-bold drop-shadow">
            ₹{total}
          </span>
        </div>
        <button
          className="w-full bg-luxuryGlow text-luxuryBg font-display text-sm sm:text-base sm:text-lg py-3 rounded-full shadow-blue-glow hover:bg-luxuryBg hover:text-luxuryGlow border-2 border-luxuryGlow transition-all duration-300"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
      <CheckoutPopup
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={user}
        cartItems={cart.items}
      />
    </>
  );
};

export default Cart;
