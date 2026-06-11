import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] rounded-2xl shadow-2xl p-8 w-full max-w-md border-2 border-[#38BDF8]">
        <h2 className="text-3xl font-bold text-[#38BDF8] text-center mb-2">Reset Password</h2>
        <p className="text-[#C0C0C0] text-sm text-center mb-6">Enter your new password below.</p>

        {success ? (
          <div className="text-center">
            <div className="text-green-400 text-lg mb-4">{message}</div>
            <p className="text-[#C0C0C0] text-sm">Redirecting to home page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <PasswordInput
              className="w-full mb-4 px-4 py-3 pr-10 border border-[#38BDF8] rounded-lg bg-[#0F172A] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] text-lg"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <PasswordInput
              className="w-full mb-4 px-4 py-3 pr-10 border border-[#38BDF8] rounded-lg bg-[#0F172A] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8] text-lg"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            {error && <div className="text-red-400 mb-3 text-center text-sm">{error}</div>}
            {message && <div className="text-green-400 mb-3 text-center text-sm">{message}</div>}
            <button
              className="w-full bg-[#38BDF8] text-[#0F172A] py-3 rounded-lg font-semibold text-lg hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition"
              type="submit"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
