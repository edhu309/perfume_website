import React, { useState } from "react";
import { useUser } from "./UserContext";

const AuthForm = () => {
  const { user, login, register, logout } = useUser();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="fixed top-8 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50 flex flex-col items-center">
        <div className="mb-2">Welcome, <b>{user.username}</b></div>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logout}>Logout</button>
      </div>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();
    setError("");
    const ok = isRegister ? register(username, password) : login(username, password);
    if (!ok) setError("Invalid credentials");
  };

  return (
    <div className="fixed top-8 right-8 bg-white/90 shadow-lg rounded-xl p-6 w-80 z-50">
      <h3 className="text-xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 px-3 py-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="w-full bg-[#38BDF8] text-white py-2 rounded mb-2" type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button className="text-blue-500 underline w-full" onClick={() => setIsRegister(r => !r)}>
        {isRegister ? "Already have an account? Login" : "No account? Register"}
      </button>
    </div>
  );
};

export default AuthForm;
