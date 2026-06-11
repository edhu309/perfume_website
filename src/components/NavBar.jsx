
import React from "react";
import { useUser } from "./UserContext";
import auramistLogo from "../assets/auramist_logo.jpeg";
import UserIcon from "./UserIcon";
import { Link, useNavigate, useLocation } from "react-router-dom";


const NavBar = ({ onLoginClick, onAdminLoginClick }) => {
  const { user, logout } = useUser();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleFeatured = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "featured-perfumes-section" } });
    } else {
      const el = document.getElementById("featured-perfumes-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#0F172A] shadow-lg fixed top-0 left-0 z-50">
      <div className="flex flex-col items-start gap-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleHome}>
          <img src={auramistLogo} alt="Auramist Logo" style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8 }} />
          <span className="text-2xl font-bold text-[#38BDF8] tracking-wide font-display">AURAMIST</span>
        </div>
      </div>
      <ul className="flex gap-5 text-[#C0C0C0] font-medium items-center">
        <li className="hover:text-[#38BDF8] cursor-pointer transition" onClick={handleHome}>Home</li>
        <li className="hover:text-[#38BDF8] cursor-pointer transition" onClick={handleFeatured}>Featured</li>
        <li><Link to="/about" className="hover:text-[#38BDF8] transition">About</Link></li>
        <li><Link to="/contact" className="hover:text-[#38BDF8] transition">Contact</Link></li>
        <li>
          <button
            className="mx-1 p-0 bg-transparent border-none outline-none"
            onClick={onAdminLoginClick}
            title="Admin Login"
          >
            <UserIcon title="Admin Login" />
          </button>
        </li>
        {isAdmin && (
          <li>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-900 hover:text-white transition text-sm whitespace-nowrap"
            >
              Admin Dashboard
            </Link>
          </li>
        )}
        {!user ? (
          <li>
            <button
              className="px-5 py-2 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300 whitespace-nowrap"
              onClick={onLoginClick}
            >
              Login
            </button>
          </li>
        ) : (
          <li className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full border border-[#38BDF8] text-[#38BDF8] bg-[#0F172A] text-sm whitespace-nowrap">
              {isAdmin ? `Admin: ${user.name}` : user.name}
            </span>
            <button
              className="px-3 py-2 rounded-full border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition text-sm whitespace-nowrap"
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
