from typing import List, Union
from pydantic import BaseModel


# --- Insurance Subtype Input Schemas ---

class AutoInsuranceRequest(BaseModel):
    vehicleType: str
    vehicleAge: int
    usage: str
    drivingHistory: str
    city: str


class LifeHealthInsuranceRequest(BaseModel):
    age: int
    conditions: List[str]
    members: int
    city: str
    habits: str


class SmallBusinessInsuranceRequest(BaseModel):
    businessType: str
    revenue: float
    employees: int
    riskFactor: str


class HomeownersInsuranceRequest(BaseModel):
    propertyValue: float
    location: str
    buildingAge: int
    constructionType: str
    security: List[str]


class FireBurglaryInsuranceRequest(BaseModel):
    propertyType: str
    safetyFeatures: List[str]
    insuredValue: float
    crimeRate: str


# --- Unified Input Schema for Main Endpoint ---

class InsuranceSubmission(BaseModel):
    category: str  # "personal" or "business"
    sub_type: str  # e.g., "Auto", "Life", etc.
    data: Union[
        AutoInsuranceRequest,
        LifeHealthInsuranceRequest,
        SmallBusinessInsuranceRequest,
        HomeownersInsuranceRequest,
        FireBurglaryInsuranceRequest
    ]


# --- Response Schema ---

class PremiumResponse(BaseModel):
    premium: float
    message: str = "Premium calculated successfully"
