import React, { useState } from "react";
import { useUser } from "./UserContext";

const AuthForm = ({ open, onClose }) => {
  const { user, login, register, logout } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  if (user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-[#0F172A] rounded-2xl shadow-2xl p-8 w-96 flex flex-col items-center border-2 border-[#38BDF8] relative">
          <button className="absolute top-3 right-3 text-[#38BDF8] text-2xl font-bold" onClick={onClose}>&times;</button>
          <div className="mb-2 text-luxurySilver text-lg">Welcome, <b>{user.username}</b></div>
          <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    const ok = isRegister ? register(username, password) : login(username, password);
    if (!ok) setError(isRegister ? "Username already registered" : "User is not registered");
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-[#0F172A] rounded-2xl shadow-2xl p-8 w-96 border-2 border-[#38BDF8] relative">
        <button className="absolute top-3 right-3 text-[#38BDF8] text-2xl font-bold" onClick={onClose}>&times;</button>
        <h3 className="text-2xl font-bold mb-6 text-[#38BDF8] text-center">{isRegister ? "Register" : "Login"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-3 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="w-full mb-5 px-4 py-2 border border-[#38BDF8] rounded bg-[#1e293b] text-[#C0C0C0] focus:outline-none focus:border-[#38BDF8]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-400 mb-3 text-center">{error}</div>}
          <button className="w-full bg-[#38BDF8] text-[#0F172A] py-2 rounded mb-3 font-semibold hover:bg-[#C0C0C0] hover:text-[#38BDF8] transition" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button className="text-[#38BDF8] underline w-full text-center" onClick={() => setIsRegister(r => !r)}>
          {isRegister ? "Already have an account? Login" : "No account? Register"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
