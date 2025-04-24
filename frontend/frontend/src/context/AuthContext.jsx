import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });
      setUser(res.data);
      navigate("/home");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser(res.data);
      navigate("/home");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.detail || "Unknown error"));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
