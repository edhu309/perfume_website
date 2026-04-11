import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username }
  const [users, setUsers] = useState([]); // [{ username, password }]

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    const exists = users.find(u => u.username === username);
    if (exists) return false;
    setUsers([...users, { username, password }]);
    setUser({ username });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
