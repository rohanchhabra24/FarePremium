import axios from "axios";

export const getPlanExplanation = async (plan) => {
  const response = await axios.post(
    "http://localhost:8000/api/ai/explain",
    plan
  );
  return response.data.message;
};
