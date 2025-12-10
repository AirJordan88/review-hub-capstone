import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API ?? "http://localhost:3000";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔐 Read initial token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔄 Keep localStorage in sync with token state
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.text();
    if (!response.ok) throw Error(result);

    setToken(result); // will also update localStorage
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.text();
    if (!response.ok) throw Error(result);

    setToken(result); // will also update localStorage
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
