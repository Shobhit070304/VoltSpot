import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
      setUser(JSON.parse(user));
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (userData) => {
    setLoading(true);
    try {
      localStorage.setItem("token", userData.token);
      setUser(userData.user); // This will trigger the useEffect above
      setIsAuthenticated(true);
      toast.success("Welcome back!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    setUser(null); // This will trigger the useEffect to clear the user
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    setLoading(false);
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
