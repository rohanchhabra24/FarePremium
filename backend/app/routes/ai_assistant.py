# backend/app/routes/ai_assistant.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/ai", tags=["AI Assistant"])

openai.api_key = os.getenv("OPENAI_API_KEY")

class PlanQuery(BaseModel):
    plan_name: str
    insurer: str
    premium: int
    features: list[str]

@router.post("/explain")
async def explain_plan(query: PlanQuery):
    prompt = (
        f"Explain this insurance plan in simple terms:\n"
        f"Plan: {query.plan_name}\n"
        f"Insurer: {query.insurer}\n"
        f"Premium: ₹{query.premium}/year\n"
        f"Features: {', '.join(query.features)}\n"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.7,
        )
        return {"message": response.choices[0].message["content"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
