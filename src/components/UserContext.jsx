
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email, role }
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // On mount, check for token and fetch user info if needed
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    if (token && email && name && role) {
      setUser({ name, email, role });
    }
    setInitialized(true);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, name, email: userEmail, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", userEmail);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      setUser({ name, email: userEmail, role });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { name, email, password });
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, initialized, login, register, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
