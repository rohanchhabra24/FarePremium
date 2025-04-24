// src/utils/api.js
import axios from "axios";

export const calculatePremium = async (payload) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/insurance/calculate/",
      payload
    );
    return response.data; // ✅ Return the parsed JSON directly
  } catch (error) {
    console.error("❌ Premium calculation failed:", error);
    throw new Error(
      error.response?.data?.detail || "Failed to calculate premium"
    );
  }
};
