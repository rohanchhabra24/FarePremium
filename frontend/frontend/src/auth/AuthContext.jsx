import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = (email, password) => {
    //Replace this with API call in real app
    const mockUser = { email };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    navigate("/");
  };

  const signup = (email, password) => {
    //Replace this with API call in real app
    const mockUser = { email };
    localStorage.setItem("user", JSON.stringify(mockUser));
    setUser(mockUser);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
