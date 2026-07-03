
import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useCart } from "./CartContext";
import auramistLogo from "../assets/auramist_logo.jpeg";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle,
  FaUserShield,
} from "react-icons/fa";


const NavBar = ({
  onLoginClick,
  onAdminLoginClick,
  onCartClick,
}) => {
  const { user, logout } = useUser();
  const { cartCount } = useCart();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
  <>
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#0F172A]/90 backdrop-blur-md shadow-lg border-b border-[#38BDF8]/20">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">

        {/* LEFT */}

        <div className="flex items-center gap-3">

          <button
            className="lg:hidden text-2xl text-[#38BDF8]"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={handleHome}
          >
            <img
              src={auramistLogo}
              alt="Auramist"
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
            />

            <span className="text-xl md:text-2xl font-bold text-[#38BDF8]">
              AURAMIST
            </span>
          </div>

        </div>

        {/* DESKTOP MENU */}

        <ul className="hidden lg:flex items-center gap-8 text-[#C0C0C0]">

          <li
            className="cursor-pointer hover:text-[#38BDF8]"
            onClick={handleHome}
          >
            Home
          </li>

          <li
            className="cursor-pointer hover:text-[#38BDF8]"
            onClick={handleFeatured}
          >
            Featured
          </li>

          <li>
            <Link to="/about" className="hover:text-[#38BDF8]">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-[#38BDF8]">
              Contact
            </Link>
          </li>

        </ul>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          <button
  onClick={onCartClick}
  className="relative text-2xl text-[#38BDF8] hover:text-white transition"
>
  <FaShoppingCart />

  {cartCount > 0 && (
    <span
      className="
        absolute
        -top-2
        -right-2
        bg-red-600
        text-white
        rounded-full
        min-w-[20px]
        h-5
        flex
        items-center
        justify-center
        text-[11px]
        font-bold
        px-1
      "
    >
      {cartCount}
    </span>
  )}
</button>

          <button
            className="text-2xl text-[#38BDF8]"
            onClick={onLoginClick}
          >
            <FaUserCircle />
          </button>

          <button
            className="text-2xl text-[#38BDF8]"
            onClick={onAdminLoginClick}
          >
            <FaUserShield />
          </button>

        </div>

      </div>

    </nav>

    {/* MOBILE MENU */}

    {menuOpen && (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />

        <aside className="fixed top-0 left-0 h-full w-72 bg-[#0F172A] shadow-2xl z-50 p-6">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-xl text-[#38BDF8] font-bold">
              Menu
            </h2>

            <button
              className="text-2xl text-[#38BDF8]"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

          </div>

          <div className="flex flex-col gap-6 text-[#C0C0C0]">

            <button
              className="text-left hover:text-[#38BDF8]"
              onClick={() => {
                handleHome();
                setMenuOpen(false);
              }}
            >
              Home
            </button>

            <button
              className="text-left hover:text-[#38BDF8]"
              onClick={() => {
                handleFeatured();
                setMenuOpen(false);
              }}
            >
              Featured
            </button>

            <Link
              className="hover:text-[#38BDF8]"
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              className="hover:text-[#38BDF8]"
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            {isAdmin && (
              <Link
                className="hover:text-[#38BDF8]"
                to="/admin"
                onClick={() => setMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}

            {user && (
              <button
                className="text-left text-red-400"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            )}

          </div>

        </aside>
      </>
    )}

  </>
);

};

export default NavBar;
