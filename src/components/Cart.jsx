import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import CheckoutPopup from "./CheckoutPopup";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { user } = useUser();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="fixed top-24 right-8 bg-luxurySurface/95 shadow-silver-glow rounded-2xl p-7 w-96 z-50 border border-luxurySilver/30 backdrop-blur-md">
        <h3 className="text-2xl font-display font-semibold mb-4 text-luxuryGlow tracking-wide drop-shadow">Your Cart</h3>
        <p className="text-luxuryMuted text-lg">Cart is empty.</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-24 right-8 bg-luxurySurface/95 shadow-silver-glow rounded-2xl p-7 w-96 z-50 border border-luxurySilver/30 backdrop-blur-md">
        <h3 className="text-2xl font-display font-semibold mb-4 text-luxuryGlow tracking-wide drop-shadow">Your Cart</h3>
        <ul className="mb-6 divide-y divide-luxurySilver/20">
          {cart.items.map(item => (
            <li key={item._id || item.id} className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-luxurySilver/30 shadow" />
                )}
                <div>
                  <span className="block text-lg font-display text-luxuryText group-hover:text-luxuryGlow transition">{item.name}</span>
                  <span className="block text-luxuryMuted text-sm">x{item.quantity}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-luxuryGlow font-semibold text-lg">${item.price * item.quantity}</span>
                <button
                  className="mt-1 text-xs text-red-400 hover:text-white hover:bg-red-400 px-2 py-1 rounded transition"
                  onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item._id || item.id })}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-luxuryMuted font-medium">Total:</span>
          <span className="text-2xl font-display text-luxuryGlow font-bold drop-shadow">${total}</span>
        </div>
        <button
          className="w-full bg-luxuryGlow text-luxuryBg font-display text-lg py-3 rounded-full shadow-blue-glow hover:bg-luxuryBg hover:text-luxuryGlow border-2 border-luxuryGlow transition-all duration-300"
          onClick={() => setCheckoutOpen(true)}
        >
          Checkout
        </button>
      </div>
      <CheckoutPopup open={checkoutOpen} onClose={() => setCheckoutOpen(false)} user={user} cartItems={cart.items} />
    </>
  );
};

export default Cart;
