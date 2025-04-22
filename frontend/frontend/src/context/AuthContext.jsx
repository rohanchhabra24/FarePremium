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

  // ✅ Sync state to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (email, password) => {
    if (!email || !password) {
      alert("Please enter valid credentials");
      return;
    }

    // 🔐 Replace with real auth logic
    const mockUser = { email };
    setUser(mockUser);
    navigate("/");
  };

  const signup = (email, password) => {
    if (!email || !password) {
      alert("Please fill all fields to sign up");
      return;
    }

    const mockUser = { email };
    setUser(mockUser);
    navigate("/");
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
