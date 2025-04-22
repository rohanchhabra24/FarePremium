import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import PremiumResult from "../pages/PremiumResult";
import PaymentGateway from "../pages/PaymentGateway";
import SuccessPage from "../pages/SuccessPage";
import LoginSignup from "../pages/LoginSignup";

import About from "../pages/About";
import Contact from "../pages/Contact";



const AppRoute = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/result" element={isAuthenticated ? <PremiumResult /> : <Navigate to="/login" />} />
      <Route path="/payment" element={isAuthenticated ? <PaymentGateway /> : <Navigate to="/login" />} />
      <Route path="/success" element={isAuthenticated ? <SuccessPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoute;
