# schemas/ai_assistant.py
from pydantic import BaseModel
from typing import List

class AIExplainRequest(BaseModel):
    plan: str
    insurer: str
    premium: float
    features: List[str]

class AIExplainResponse(BaseModel):
    explanation: str
