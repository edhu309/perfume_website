import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  description: "",
  category: "",
  image: "",
  price: "",
  stock: "",
  sections: ["featured"],
};

const BACKEND = import.meta.env.VITE_BACKEND_URL || "https://scentra-backend.onrender.com";
const categories = ["woody", "fresh", "oriental", "floral", "citrus", "spicy"];
const sectionOptions = [
  { value: "featured", label: "Featured Perfumes" },
  { value: "explore", label: "Explore Collection" },
  { value: "discover", label: "Discover Collection" },
];

const inputCls =
  "w-full bg-[#0F172A] border border-[#38BDF8]/30 text-luxurySilver placeholder-[#475569] rounded-xl px-4 py-3 focus:outline-none focus:border-[#38BDF8] transition text-sm";

const categoryColors = {
  woody: "bg-amber-900/40 text-amber-300",
  fresh: "bg-cyan-900/40 text-cyan-300",
  oriental: "bg-purple-900/40 text-purple-300",
  floral: "bg-pink-900/40 text-pink-300",
  citrus: "bg-yellow-900/40 text-yellow-300",
  spicy: "bg-red-900/40 text-red-300",
};

export default function AdminDashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSectionToggle = (section) => {
    setForm((prev) => {
      const current = prev.sections || [];
      const updated = current.includes(section)
        ? current.filter((s) => s !== section)
        : [...current, section];
      return { ...prev, sections: updated };
    });
  };

  const handleImageUpload = async (e) => {
    console.log("Image upload function called");
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await api.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
     console.log("UPLOAD RESPONSE:", res.data);

setForm((prev) => ({
  ...prev,
  image: res.data.imageUrl
}));
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed");
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
        setSuccess("Product updated successfully.");
      } else {
        await api.post("/products", form);
        setSuccess("Product added successfully.");
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error saving product");
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!globalThis.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setSuccess("Product deleted.");
      fetchProducts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setError("");
  };

  return (
    <div
      className="min-h-screen bg-[#0F172A] pt-8 pb-20 px-4"
      style={{ backgroundImage: "radial-gradient(ellipse at 60% 10%, #38BDF811 0%, #0F172A 70%)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto flex items-center justify-between mb-12 pt-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-light text-luxurySilver tracking-wide">
            Admin Dashboard
          </h1>
          <p className="text-luxuryMuted text-sm mt-1">
            Logged in as <span className="text-[#38BDF8]">{user?.name}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-full border border-[#38BDF8]/40 text-[#38BDF8] text-sm hover:bg-[#38BDF8]/10 transition"
          >
            ← Back to Site
          </button>
          <button
            onClick={logout}
            className="px-5 py-2 rounded-full border border-red-500/40 text-red-400 text-sm hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Form Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-2 bg-[#1E293B]/80 backdrop-blur-md rounded-2xl border border-[#38BDF8]/20 shadow-blue-glow p-6"
        >
          <h2 className="text-xl font-display text-[#38BDF8] mb-1">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-luxuryMuted text-xs mb-6">
            {editingId ? "Update the fields and save." : "Fill in the details below to list a new fragrance."}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className={inputCls}
              required
            />

            {/* Image upload */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Image URL (or upload)"
                  className={inputCls + " flex-1"}
                  required
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded-xl border border-[#38BDF8]/30 shadow"
                  />
                )}
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <span className="px-4 py-2 rounded-full border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-medium group-hover:bg-[#38BDF8]/10 transition">
                  {uploading ? "Uploading…" : "Choose File"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                <span className="text-[#475569] text-xs">max 5 MB · jpg / png / webp</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price ($)"
                type="number"
                min="0"
                className={inputCls}
                required
              />
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                type="number"
                min="0"
                className={inputCls}
                required
              />
            </div>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={inputCls}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              rows={3}
              className={inputCls + " resize-none"}
              required
            />

            {/* Section Assignment */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-luxuryMuted uppercase tracking-wider">Show in Sections</span>
              <div className="flex flex-wrap gap-3">
                {sectionOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border text-xs cursor-pointer transition ${
                      (form.sections || []).includes(opt.value)
                        ? "border-[#38BDF8] bg-[#38BDF8]/10 text-[#38BDF8]"
                        : "border-[#475569] text-[#475569] hover:border-[#38BDF8]/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={(form.sections || []).includes(opt.value)}
                      onChange={() => handleSectionToggle(opt.value)}
                      className="sr-only"
                    />
                    <span className={`w-3 h-3 rounded-sm border ${
                      (form.sections || []).includes(opt.value)
                        ? "bg-[#38BDF8] border-[#38BDF8]"
                        : "border-[#475569]"
                    }`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm bg-red-900/20 border border-red-500/30 rounded-xl px-4 py-2"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-emerald-400 text-sm bg-emerald-900/20 border border-emerald-500/30 rounded-xl px-4 py-2"
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="flex-1 py-3 rounded-full bg-[#38BDF8] text-[#0F172A] font-semibold text-sm hover:bg-[#7DD3FC] transition"
              >
                {editingId ? "Save Changes" : "Add Product"}
              </motion.button>
              {editingId && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-3 rounded-full border border-[#475569] text-luxuryMuted text-sm hover:bg-[#1E293B] transition"
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        {/* ── Products Table ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-3 bg-[#1E293B]/80 backdrop-blur-md rounded-2xl border border-[#38BDF8]/20 shadow-blue-glow p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display text-[#38BDF8]">Product Catalogue</h2>
            <span className="text-xs text-luxuryMuted bg-[#0F172A] border border-[#38BDF8]/20 px-3 py-1 rounded-full">
              {products.length} item{products.length === 1 ? "" : "s"}
            </span>
          </div>

          {(() => {
            if (loading) return <div className="flex items-center justify-center h-40 text-luxuryMuted">Loading…</div>;
            if (products.length === 0) return (
              <div className="flex flex-col items-center justify-center h-40 text-luxuryMuted gap-2">
                <span className="text-3xl opacity-30">◈</span>
                <span className="text-sm">No products yet. Add your first fragrance.</span>
              </div>
            );
            return <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#38BDF8]/10 text-luxuryMuted text-xs uppercase tracking-widest">
                    <th className="pb-3 text-left font-normal pl-1">Image</th>
                    <th className="pb-3 text-left font-normal">Name</th>
                    <th className="pb-3 text-left font-normal">Category</th>
                    <th className="pb-3 text-left font-normal">Price</th>
                    <th className="pb-3 text-left font-normal">Stock</th>
                    <th className="pb-3 text-left font-normal">Sections</th>
                    <th className="pb-3 text-right font-normal pr-1">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-[#1E293B] hover:bg-[#38BDF8]/5 transition group"
                    >
                      <td className="py-3 pl-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-xl border border-[#38BDF8]/20 shadow"
                        />
                      </td>
                      <td className="py-3 font-medium text-luxurySilver max-w-[120px] truncate">
                        {product.name}
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${categoryColors[product.category] || "bg-slate-800 text-slate-300"}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 text-[#38BDF8] font-semibold">₹{product.price}</td>
                      <td className="py-3 text-luxuryMuted">{product.stock}</td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {(product.sections || []).map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 pr-1 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1.5 rounded-full border border-[#38BDF8]/40 text-[#38BDF8] text-xs hover:bg-[#38BDF8]/10 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
           })()}
        </motion.div>
      </div>
    </div>
  );
}
