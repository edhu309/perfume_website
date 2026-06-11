import React, { useState } from "react";
import { useUser } from "./UserContext";

const AuthForm = () => {
  const { user, login, register, logout, loading, error } = useUser();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");


  if (user) {
    return (
      <div className="fixed top-8 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50 flex flex-col items-center">
        <div className="mb-2">Welcome, <b>{user.name}</b></div>
        <div className="mb-2 text-xs text-gray-500">{user.email}</div>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
      </div>
    );
  }


  const handleSubmit = async e => {
    e.preventDefault();
    setLocalError("");
    let ok = false;
    if (isRegister) {
      ok = await register(name, email, password);
    } else {
      ok = await login(email, password);
    }
    if (!ok) setLocalError("Invalid credentials");
  };


  const handleSwitch = () => {
    setIsRegister(r => !r);
    setEmail("");
    setName("");
    setPassword("");
    setLocalError("");
  };

  return (
    <div className="fixed top-8 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50">
      <h3 className="text-xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h3>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            className="w-full mb-2 px-3 py-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        )}
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-4 px-3 py-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {(error || localError) && <div className="text-red-500 mb-2">{error || localError}</div>}
        <button className="w-full bg-[#38BDF8] text-white py-2 rounded mb-2" type="submit" disabled={loading}>
          {loading ? "Loading..." : isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button className="text-blue-500 underline w-full" onClick={handleSwitch}>
        {isRegister ? "Already have an account? Login" : "No account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;
