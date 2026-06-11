import React, { useState } from "react";
import PropTypes from "prop-types";

const CustomFragrancePopup = ({ open, onClose, userPhone }) => {
  const [customFragrance, setCustomFragrance] = useState("");
  const [phone, setPhone] = useState(userPhone || "");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSend = () => {
    if (!customFragrance.trim() || !phone.trim()) {
      setError("Please enter your phone and required fragrance details.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    setError("");
    const adminNumber = "919207451758";
    const msg =
      `Custom Fragrance Request\n` +
      `Phone: ${phone}\n` +
      `Required Fragrance: ${customFragrance}`;
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    setCustomFragrance("");
    setPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] border-2 border-[#38BDF8] text-[#C0C0C0] px-8 py-8 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col items-center relative animate-fadeInUp">
        <button
          className="absolute top-3 right-4 text-[#38BDF8] text-2xl font-bold"
          onClick={() => { setCustomFragrance(""); setPhone(""); setError(""); onClose(); }}
          aria-label="Close custom fragrance modal"
        >&times;</button>
        <h3 className="text-xl md:text-2xl font-display font-light text-[#38BDF8] mb-4">Custom Fragrance Request</h3>
        <label htmlFor="custom-fragrance" className="block mb-2 text-lg font-medium">Required Fragrance Details</label>
        <textarea
          id="custom-fragrance"
          className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-[#0F172A] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] resize-none mb-4"
          rows={3}
          value={customFragrance}
          onChange={e => setCustomFragrance(e.target.value)}
          placeholder="Describe your desired fragrance (notes, style, etc.)"
          aria-label="Required Fragrance Details"
        />
        <label htmlFor="custom-phone" className="block mb-2 text-lg font-medium">Phone Number</label>
        <input
          id="custom-phone"
          className="w-full px-4 py-2 rounded-lg border border-[#38BDF8] bg-[#0F172A] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] mb-4"
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="Enter your 10-digit phone number"
          maxLength={10}
          aria-label="Phone Number"
        />
        {error && <div className="text-red-400 mb-3 text-center">{error}</div>}
        <button
          className="w-full bg-[#38BDF8] text-[#0F172A] py-3 rounded-full font-semibold text-lg mt-2 hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
          onClick={handleSend}
        >
          Send Custom Fragrance Request
        </button>
      </div>
    </div>
  );
};

CustomFragrancePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userPhone: PropTypes.string
};

export default CustomFragrancePopup;
