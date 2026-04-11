import React from "react";
import { useUser } from "./UserContext";


const NavBar = ({ onLoginClick }) => {
  const { user, logout } = useUser();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#0F172A] shadow-lg fixed top-0 left-0 z-50">
      <div className="flex flex-col items-start gap-0">
        <div className="flex items-center gap-3">
          {/* Symbol: Droplet with swirling A */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="auraGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="1" stopColor="#C0C0C0" />
              </linearGradient>
            </defs>
            <path d="M18 4C18 4 7 16.5 7 23.5C7 29.0228 11.4772 33 18 33C24.5228 33 29 29.0228 29 23.5C29 16.5 18 4 18 4Z" fill="url(#auraGradient)" stroke="#38BDF8" strokeWidth="2"/>
            <path d="M18 25C19.5 22 22 19.5 18 15C14 19.5 16.5 22 18 25Z" fill="none" stroke="#0F172A" strokeWidth="1.5"/>
            <text x="11" y="27" fontFamily="serif" fontSize="13" fill="#0F172A" fontWeight="bold">A</text>
          </svg>
          <span className="text-2xl font-bold text-[#38BDF8] tracking-wide font-display">AURAMIST</span>
        </div>
      </div>
      <ul className="flex gap-8 text-[#C0C0C0] font-medium items-center">
        <li className="hover:text-[#38BDF8] cursor-pointer transition">Home</li>
        <li className="hover:text-[#38BDF8] cursor-pointer transition">Featured</li>
        <li className="hover:text-[#38BDF8] cursor-pointer transition">About</li>
        <li className="hover:text-[#38BDF8] cursor-pointer transition">Contact</li>
        {!user ? (
          <li>
            <button
              className="ml-6 px-5 py-2 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
              onClick={onLoginClick}
            >
              Login
            </button>
          </li>
        ) : (
          <li>
            <span className="ml-6 px-4 py-2 rounded-full border border-[#38BDF8] text-[#38BDF8] bg-[#0F172A]">{user.username}</span>
            <button
              className="ml-2 px-3 py-2 rounded border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
