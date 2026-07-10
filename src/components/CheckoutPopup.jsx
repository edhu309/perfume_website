import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomFragrancePopup from "./CustomFragrancePopup";

const CheckoutPopup = ({ open, onClose, user, cartItems }) => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showCustomModal, setShowCustomModal] = useState(false);

  if (!open) return null;

  const handleConfirm = () => {
    if (!address.trim() || !phone.trim()) {
      setError("Please enter both address and phone number.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    setError("");
    // Compose WhatsApp message (professional, no % symbols)
    const adminNumber = "919037242256";
    const orderDetails = cartItems.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join("\n");
    const msg =
      `New Perfume Order!\n` +
      `Name: ${user?.name || "-"}\n` +
      `Phone: ${phone}\n` +
      `Address: ${address.replaceAll('\n', ' ')}\n` +
      `Order:\n${orderDetails}`;
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    onClose();
  };



  return (
    <div className="fixed inset-0 z-[300] pt-20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#0F172A] border-2 border-[#C0C0C0] text-[#C0C0C0] px-8 py-8 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center relative animate-fadeInUp">
        <button className="absolute top-3 right-4 text-[#38BDF8] text-2xl font-bold" onClick={onClose}>&times;</button>
        <h2 className="text-2xl md:text-3xl font-display font-light text-[#38BDF8] mb-6 tracking-wide">Checkout</h2>
        <div className="w-full mb-4">
          <label htmlFor="delivery-address" className="block mb-2 text-lg font-medium">Delivery Address</label>
          <textarea
            id="delivery-address"
            className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] resize-none"
            rows={3}
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
            disabled={showCustomModal}
            aria-label="Delivery Address"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="phone-number" className="block mb-2 text-lg font-medium">Phone Number</label>
          <input
            id="phone-number"
            className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Enter your 10-digit phone number"
            maxLength={10}
            aria-label="Phone Number"
          />
        </div>
        {error && <div className="text-red-400 mb-3 text-center">{error}</div>}
        <button
          className="w-full bg-[#38BDF8] text-[#0F172A] py-3 rounded-full font-semibold text-lg mt-2 hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
          onClick={handleConfirm}
        >
          Confirm Order &amp; WhatsApp Admin
        </button>
        <div className="w-full flex items-center my-4">
          <div className="flex-grow h-px bg-[#38BDF8]/30" />
          <span className="mx-3 text-[#38BDF8] text-sm">or</span>
          <div className="flex-grow h-px bg-[#38BDF8]/30" />
        </div>
        <button
          className="w-full bg-[#0F172A] border border-[#38BDF8] text-[#38BDF8] py-3 rounded-full font-semibold text-lg mt-2 hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
          onClick={() => setShowCustomModal(true)}
        >
          Request Custom Fragrance
        </button>

        <CustomFragrancePopup
          open={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          userPhone={phone}
        />
      </div>
    </div>
  );
};


CheckoutPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string
  }),
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
};

export default CheckoutPopup;
