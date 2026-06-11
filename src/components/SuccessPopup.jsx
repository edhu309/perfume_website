import React from "react";

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#0F172A] border-2 border-[#C0C0C0] text-[#C0C0C0] px-10 py-8 rounded-3xl shadow-2xl text-2xl font-display font-light flex flex-col items-center relative animate-fadeInUp" style={{boxShadow: '0 4px 32px 0 #C0C0C055, 0 1.5px 8px 0 #38BDF822'}}>
        <span className="mb-2 text-2xl md:text-3xl font-display tracking-wide drop-shadow text-[#38BDF8]">{message}</span>
        <button
          className="mt-4 px-6 py-2 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300 shadow"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
