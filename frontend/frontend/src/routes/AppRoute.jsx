import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LoginSignup from "../pages/LoginSignup";
import Home from "../pages/Home";
import PremiumResult from "../pages/PremiumResult";
import PaymentGateway from "../pages/PaymentGateway";
import SuccessPage from "../pages/SuccessPage";
import About from "../pages/About";
import Contact from "../pages/Contact";

const AppRoute = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LoginSignup />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />
      <Route
        path="/result"
        element={isAuthenticated ? <PremiumResult /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />
      <Route
        path="/payment"
        element={isAuthenticated ? <PaymentGateway /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />
      <Route
        path="/success"
        element={isAuthenticated ? <SuccessPage /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />
      <Route
        path="/about"
        element={isAuthenticated ? <About /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />
      <Route
        path="/contact"
        element={isAuthenticated ? <Contact /> : <Navigate to="/" state={{ unauthorized: true }} />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoute;
