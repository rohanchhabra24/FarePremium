# routes/ai_assistant.py
from fastapi import APIRouter, HTTPException
from schemas.ai_assistant import AIExplainRequest, AIExplainResponse
from openai import OpenAI
import os

router = APIRouter(prefix="/api/insurance", tags=["AI Assistant"])

# Set up OpenAI client
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # Set this in your .env or shell

@router.post("/ai-explain/", response_model=AIExplainResponse)
async def explain_plan(payload: AIExplainRequest):
    try:
        message = f"""Explain this insurance plan in simple terms:

        Plan: {payload.plan}
        Insurer: {payload.insurer}
        Premium: ₹{payload.premium}/year
        Features: {', '.join(payload.features)}

        Please break it down in layman's terms, briefly highlighting what makes it unique and valuable.
        """

        completion = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": message}
            ]
        )

        return {"explanation": completion.choices[0].message.content}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
