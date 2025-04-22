import { createContext, useContext, useState } from "react";
import axios from "axios";

const InsuranceContext = createContext();

export const useInsurance = () => useContext(InsuranceContext);

export const InsuranceProvider = ({ children }) => {
  const [insuranceCategory, setInsuranceCategory] = useState(null);
  const [insuranceType, setInsuranceType] = useState(null);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null); 

  return (
    <InsuranceContext.Provider
      value={{
        insuranceCategory,
        setInsuranceCategory,
        insuranceType,
        setInsuranceType,
        formData,
        setFormData,
        result,
        setResult, 
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};
