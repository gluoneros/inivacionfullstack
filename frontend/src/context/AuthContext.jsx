import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await api.post("/usuarios/login/", { username, password });
      const data = response.data;

      setUser({ username: data.username, role: data.role });
      setTokens({ access: data.access, refresh: data.refresh });
      localStorage.setItem("authTokens", JSON.stringify(data));
      return true;
    } catch {
      throw new Error("Credenciales inválidas");
    }
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("authTokens");
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");
    if (storedTokens) {
      const data = JSON.parse(storedTokens);
      setUser({ username: data.username, role: data.role });
      setTokens({ access: data.access, refresh: data.refresh });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
