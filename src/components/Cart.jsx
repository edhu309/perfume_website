import React from "react";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.items.length === 0) {
    return (
      <div className="fixed top-20 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50">
        <h3 className="text-xl font-bold mb-4">Your Cart</h3>
        <p className="text-gray-500">Cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50">
      <h3 className="text-xl font-bold mb-4">Your Cart</h3>
      <ul className="mb-4">
        {cart.items.map(item => (
          <li key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x{item.quantity}</span>
            <span>${item.price * item.quantity}</span>
            <button
              className="ml-2 text-red-500 hover:underline"
              onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="font-semibold mb-4">Total: ${total}</div>
      <button className="w-full bg-[#38BDF8] text-white py-2 rounded hover:bg-[#0F172A] transition">Checkout</button>
    </div>
  );
};

export default Cart;
