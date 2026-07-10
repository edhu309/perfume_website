import React from "react";
import { useLocation } from "react-router-dom";
import CustomFragrancePopup from "../components/CustomFragrancePopup";
import NavBar from "../components/NavBar";
import FeaturedPerfumes from "../components/FeaturedPerfumes";
import Carousel from "../components/Carousel";
import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpg";
import carousel3 from "../assets/carousel3.jpg";

import ScrollStory from "../components/ScrollStory";
import Cart from "../components/Cart";
import AuthFormPopup from "../components/AuthFormPopup";
import AdminAuthFormPopup from "../components/AdminAuthFormPopup";
import ExplorePopup from "../components/ExplorePopup";
import { useUser } from "../components/UserContext";
import SuccessPopup from "../components/SuccessPopup";

const Home = () => {
  const { user } = useUser();
  const location = useLocation();
  const [authOpen, setAuthOpen] = React.useState(false);
  const [adminAuthOpen, setAdminAuthOpen] = React.useState(false);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("");
  const [customPopupOpen, setCustomPopupOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [showLoginReminder, setShowLoginReminder] = React.useState(false);

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      // Clear the state so it doesn't re-scroll on subsequent renders
      window.history.replaceState({}, "");
    }
  }, [location.state]);
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden">
      <NavBar
  onLoginClick={() => setAuthOpen(true)}
  onAdminLoginClick={() => setAdminAuthOpen(true)}
  onCartClick={() => setCartOpen(true)}
  showLoginReminder={showLoginReminder}
/>
      <AuthFormPopup
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        setSuccessMsg={setSuccessMsg}
      />
      <AdminAuthFormPopup
        open={adminAuthOpen}
        onClose={() => setAdminAuthOpen(false)}
        setSuccessMsg={setSuccessMsg}
      />
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg("")} />
      <ExplorePopup
    open={exploreOpen}
    onClose={() => setExploreOpen(false)}
    onRequireLogin={() => {
        setShowLoginReminder(true);

        setTimeout(() => {
            setShowLoginReminder(false);
        }, 3000);
    }}
/>
      <CustomFragrancePopup
        open={customPopupOpen}
        onClose={() => setCustomPopupOpen(false)}
        userPhone={user?.phone || ""}
      />
      
 <Cart
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  onRequireLogin={() => {
    setShowLoginReminder(true);

    setTimeout(() => {
      setShowLoginReminder(false);
    }, 3000);
  }}
/>

      <section
        className="relative w-full flex flex-col items-stretch justify-center"
        style={{
          backgroundImage: "url('/Rugged%20Elegance%20Perfume.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
        <div
          className="
relative
z-20
flex
flex-col
items-center
text-center
px-4
sm:px-6
lg:px-8
pt-24
sm:pt-28
md:pt-32
pb-10
md:pb-14
w-full
"
        >
          {" "}
          {/* pt-32 for navbar space */}
          <h1
            className="text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl font-display font-light tracking-wide text-luxurySilver mb-6 drop-shadow-silver-glow leading-tight"
          >
            Define Your Scent
          </h1>
          <p
            className="text-base
sm:text-lg
md:text-xl
lg:text-2xl text-luxuryMuted mb-6 max-w-xl
md:max-w-2xl font-sans"
          >
            Discover the essence of modern luxury. Crafted for those who
            appreciate the art of fine fragrance.
          </p>
          <button
            className="mb-10 px-6
sm:px-8
md:px-10
py-3
md:py-4
text-base
sm:text-lg
md:text-xl rounded-full border-2 border-luxurySilver text-luxurySilver font-semibold text-xl bg-white/5 backdrop-blur-md shadow-silver-glow transition-all duration-300 hover:bg-luxurySilver hover:text-luxuryBg focus:outline-none"
            style={{
              boxShadow: "0 4px 32px 0 #C0C0C055, 0 1.5px 8px 0 #38BDF822",
            }}
            onClick={() => setExploreOpen(true)}
          >
            Explore Collection
          </button>
          <div className="w-full mb-8">
            <Carousel
              images={[carousel1, carousel2, carousel3]}
              autoSlide
              interval={3000}
            />
            <div className="mt-4 flex flex-col items-center">
              <div
                className="text-xl
sm:text-2xl
md:text-3xl text-[#C0C0C0] font-serif italic font-semibold text-center tracking-wide drop-shadow"
                style={{ letterSpacing: "0.04em" }}
              >
                Craft Your Scent
              </div>
              <button
                className="mt-5 px-5
sm:px-6
md:px-8
py-3 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold text-base
sm:text-lg
md:text-xl bg-[#0F172A]/80 backdrop-blur-md shadow hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
                onClick={() => setCustomPopupOpen(true)}
              >
                Request Custom Fragrance
              </button>
            </div>
          </div>
        </div>
        <div id="featured-perfumes-section">
          <FeaturedPerfumes
  onRequireLogin={() => {
    setShowLoginReminder(true);

    setTimeout(() => {
      setShowLoginReminder(false);
    }, 3000);
  }}
/>
        </div>
        <ScrollStory />
      </section>
    </div>
  );
};

export default Home;
