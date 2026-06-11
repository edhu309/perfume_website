import React, { useState } from "react";
import { useUser } from "./UserContext";
import api from "../services/api";
import PasswordInput from "./PasswordInput";


// Removed admin autofill logic
const AuthForm = ({ open, onClose, setSuccessMsg }) => {
  const { user, login, register, logout, loading, error } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [localError, setLocalError] = useState("");

  if (!open) return null;

  if (user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-[#0F172A] rounded-2xl shadow-2xl p-8 w-96 flex flex-col items-center border-2 border-[#38BDF8] relative">
          <button className="absolute top-3 right-3 text-[#38BDF8] text-2xl font-bold" onClick={onClose}>&times;</button>
          <div className="mb-2 text-luxurySilver text-lg">Welcome, <b>{user.name}</b></div>
          <div className="mb-2 text-xs text-gray-400">{user.email}</div>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLocalError("");
    if (isRegister) {
      // Validate
      if (!registerData.name || !registerData.email || !registerData.password) {
        setLocalError("All fields are required");
        return;
      }
      const ok = await register(registerData.name, registerData.email, registerData.password);
      if (ok) {
        if (setSuccessMsg) setSuccessMsg("User registered successfully!");
        setRegisterData({ name: "", email: "", password: "" });
        setLoginData({ email: "", password: "" });
        setTimeout(() => {
          setIsRegister(false);
          if (setSuccessMsg) setSuccessMsg("");
          onClose();
        }, 1500);
      } else {
        setLocalError(error || "Registration failed");
      }
    } else {
      if (!loginData.email || !loginData.password) {
        setLocalError("All fields are required");
        return;
      }
      const ok = await login(loginData.email, loginData.password);
      if (ok) {
        if (setSuccessMsg) setSuccessMsg("Welcome, " + localStorage.getItem("name"));
        setLoginData({ email: "", password: "" });
        setTimeout(() => {
          if (setSuccessMsg) setSuccessMsg("");
          onClose();
        }, 1500);
      } else {
        setLocalError(error || "Login failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#0F172A] rounded-2xl shadow-2xl p-8 w-96 border-2 border-[#38BDF8] relative">
        <button className="absolute top-3 right-3 text-[#38BDF8] text-2xl font-bold" onClick={onClose}>&times;</button>

        {isForgotPassword ? (
          <>
            <h3 className="text-2xl font-bold mb-6 text-[#38BDF8] text-center">Forgot Password</h3>
            <p className="text-[#C0C0C0] text-sm mb-4 text-center">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setForgotMsg("");
              setForgotLoading(true);
              try {
                const res = await api.post("/auth/forgot-password", { email: forgotEmail });
                setForgotMsg(res.data.message);
              } catch (err) {
                setForgotMsg(err.response?.data?.message || "Something went wrong");
              }
              setForgotLoading(false);
            }}>
              <input
                className="w-full mb-4 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                type="email"
                placeholder="Your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              {forgotMsg && <div className="text-[#38BDF8] mb-3 text-center text-sm">{forgotMsg}</div>}
              <button className="w-full bg-[#38BDF8] text-[#0F172A] py-2 rounded mb-3 font-semibold hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition" type="submit" disabled={forgotLoading}>
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <button className="text-[#38BDF8] underline w-full text-center" onClick={() => { setIsForgotPassword(false); setForgotMsg(""); setForgotEmail(""); }}>
              Back to Login
            </button>
          </>
        ) : (
        <>
        <h3 className="text-2xl font-bold mb-6 text-[#38BDF8] text-center">{isRegister ? "Register" : "Login"}</h3>
        <form onSubmit={handleSubmit}>
          {isRegister ? (
            <>
              <input
                className="w-full mb-3 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                placeholder="Name"
                value={registerData.name}
                onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
                required
              />
              <input
                className="w-full mb-3 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                required
              />
              <PasswordInput
                className="w-full mb-5 px-4 py-2 pr-10 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                placeholder="Password"
                value={registerData.password}
                onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
            </>
          ) : (
            <>
              <input
                className="w-full mb-3 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
                disabled={false}
              />
              <PasswordInput
                className="w-full mb-5 px-4 py-2 pr-10 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
                placeholder="Password"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                required
                disabled={false}
              />
            </>
          )}
          {(error || localError) && <div className="text-red-400 mb-3 text-center">{error || localError}</div>}
          <button className="w-full bg-[#38BDF8] text-[#0F172A] py-2 rounded mb-3 font-semibold hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition" type="submit" disabled={loading}>
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </button>
        </form>
        {!isRegister && (
          <button className="text-[#C0C0C0] text-sm underline w-full text-center mb-2 hover:text-[#38BDF8] transition" onClick={() => { setIsForgotPassword(true); setLocalError(""); }}>
            Forgot Password?
          </button>
        )}
        <button className="text-[#38BDF8] underline w-full text-center" onClick={() => {
          setIsRegister(r => !r);
          setLocalError("");
          setRegisterData({ name: "", email: "", password: "" });
          setLoginData({ email: "", password: "" });
        }}>
          {isRegister ? "Already have an account? Login" : "No account? Register"}
        </button>
        </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
