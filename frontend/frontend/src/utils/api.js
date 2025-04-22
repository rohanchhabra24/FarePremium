// src/utils/api.js

export const calculatePremium = async (payload) => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/insurance/calculate/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to calculate premium");
  }

  return response.json();
};
