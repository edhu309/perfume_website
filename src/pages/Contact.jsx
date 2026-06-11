import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import AuthFormPopup from "../components/AuthFormPopup";
import AdminAuthFormPopup from "../components/AdminAuthFormPopup";
import SuccessPopup from "../components/SuccessPopup";

const Contact = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const adminNumber = "919037286318";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) {
      return;
    }
    const msg =
      `Contact Message\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Message: ${form.message}`;
    const waUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputCls = "w-full px-4 py-3 rounded-lg border border-[#38BDF8] bg-[#0F172A] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] text-base";

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <NavBar onLoginClick={() => setAuthOpen(true)} onAdminLoginClick={() => setAdminAuthOpen(true)} />
      <AuthFormPopup open={authOpen} onClose={() => setAuthOpen(false)} setSuccessMsg={setSuccessMsg} />
      <AdminAuthFormPopup open={adminAuthOpen} onClose={() => setAdminAuthOpen(false)} setSuccessMsg={setSuccessMsg} />
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg("")} />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-light text-[#38BDF8] mb-4 tracking-wide">
            Contact Us
          </h1>
          <p className="text-xl text-[#C0C0C0] max-w-2xl mx-auto">
            We'd love to hear from you. Reach out for orders, custom fragrance requests, or any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-[#1e293b] rounded-2xl p-8 border border-[#38BDF8]/20">
            <h2 className="text-2xl font-display text-[#38BDF8] mb-6">Send a Message</h2>
            {sent ? (
              <div className="text-green-400 text-lg text-center py-8">
                Message sent via WhatsApp! We'll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  className={inputCls}
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  className={inputCls}
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <input
                  className={inputCls}
                  type="tel"
                  placeholder="Your 10-digit Phone Number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  maxLength={10}
                  required
                  pattern="\d{10}"
                  title="Phone number must be exactly 10 digits"
                />
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={4}
                  placeholder="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-[#38BDF8] text-[#0F172A] py-3 rounded-full font-semibold text-lg hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
                >
                  Send via WhatsApp
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-3">WhatsApp</h3>
              <a
                href={`https://wa.me/${adminNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38BDF8] text-lg hover:underline"
              >
                +91 9037286318
              </a>
              <p className="text-[#94A3B8] text-sm mt-1">Available Mon–Sat, 10 AM – 8 PM</p>
            </div>

            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-3">Email</h3>
              <a
                href="mailto:auramistperfumes90@gmail.com"
                className="text-[#38BDF8] text-lg hover:underline break-all"
              >
                auramistperfumes90@gmail.com
              </a>
              <p className="text-[#94A3B8] text-sm mt-1">We respond within 24 hours</p>
            </div>

            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-3">Follow Us</h3>
              <p className="text-[#94A3B8]">
                Stay updated with our latest collections and offers on social media.
              </p>
            </div>

            <div className="bg-[#1e293b] rounded-2xl p-6 border border-[#38BDF8]/20">
              <h3 className="text-xl font-display text-[#C0C0C0] mb-3">Location</h3>
              <p className="text-[#94A3B8]">
                Kerala, India
              </p>
              <p className="text-[#94A3B8] text-sm mt-1">We deliver across India</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
          <Link
            to="/"
            className="px-8 py-3 rounded-full border-2 border-[#38BDF8] text-[#38BDF8] font-semibold text-lg bg-[#0F172A] hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-300"
          >
            Back to Home
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 rounded-full border-2 border-[#38BDF8] text-[#0F172A] font-semibold text-lg bg-[#38BDF8] hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition-all duration-300"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
