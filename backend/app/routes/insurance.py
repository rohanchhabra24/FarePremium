from fastapi import APIRouter, HTTPException
from schemas.insurance import (
    InsuranceSubmission,
    PremiumResponse,
    AutoInsuranceRequest,
    LifeHealthInsuranceRequest,
    SmallBusinessInsuranceRequest,
    HomeownersInsuranceRequest,
    FireBurglaryInsuranceRequest
)

router = APIRouter(prefix="/api/insurance", tags=["Insurance"])

@router.post("/calculate/", response_model=PremiumResponse)
async def calculate_premium(payload: InsuranceSubmission):
    try:
        category = payload.category.lower()
        subtype = payload.sub_type
        data = payload.data

        if category == "personal":
            if subtype == "Auto" and isinstance(data, AutoInsuranceRequest):
                base = 3000

                if data.vehicleType == "SUV":
                    base += 1200
                elif data.vehicleType == "Bike":
                    base -= 500

                if data.usage == "Commercial":
                    base += 1500

                accident_map = {
                    "No accidents": 0,
                    "1 accident": 800,
                    "2 accidents": 1500,
                    "3+ accidents": 2500,
                }
                base += accident_map.get(data.drivingHistory, 0)

                city_multiplier = {
                    "Delhi": 1.2,
                    "Mumbai": 1.3,
                    "Bangalore": 1.1,
                    "Chennai": 1.05,
                    "Hyderabad": 1.0
                }

                premium = base + (data.vehicleAge * 100)
                premium *= city_multiplier.get(data.city, 1.0)
                return PremiumResponse(premium=round(premium, 2))

            elif subtype in ["Life", "Health"] and isinstance(data, LifeHealthInsuranceRequest):
                base = 4000 + (data.members * 300)

                if data.age > 50:
                    base += 2000
                elif data.age > 35:
                    base += 1000

                base += len([c for c in data.conditions if c != "None"]) * 500

                if data.habits == "Both":
                    base += 2000
                elif data.habits in ["Smoking", "Alcohol"]:
                    base += 1000

                city_risk = {
                    "Delhi": 1.2,
                    "Mumbai": 1.3,
                    "Bangalore": 1.1,
                    "Chennai": 1.0,
                    "Hyderabad": 0.95
                }

                premium = base * city_risk.get(data.city, 1.0)
                return PremiumResponse(premium=round(premium, 2))

        elif category == "business":
            if subtype == "Small Business" and isinstance(data, SmallBusinessInsuranceRequest):
                multiplier = {"Low": 1.0, "Medium": 1.5, "High": 2.0}
                premium = (data.revenue * 0.01) + (data.employees * 150)
                premium *= multiplier.get(data.riskFactor, 1.0)
                return PremiumResponse(premium=round(premium, 2))

            elif subtype == "Homeowners" and isinstance(data, HomeownersInsuranceRequest):
                base = data.propertyValue * 0.012

                if data.constructionType == "Wood":
                    base += 1000
                elif data.constructionType == "Brick":
                    base += 500

                if data.buildingAge > 20:
                    base += 2000
                elif data.buildingAge > 10:
                    base += 1000

                if "CCTV" in data.security:
                    base -= 300
                if "Fire Alarm" in data.security:
                    base -= 500

                return PremiumResponse(premium=round(base, 2))

            elif subtype == "Fire & Burglary" and isinstance(data, FireBurglaryInsuranceRequest):
                rate = {"Low": 1.1, "Moderate": 1.5, "High": 2.0}
                discount = 0

                if "Extinguisher" in data.safetyFeatures:
                    discount += 200
                if "Exit Routes" in data.safetyFeatures:
                    discount += 300

                premium = (data.insuredValue * 0.02 * rate.get(data.crimeRate, 1.0)) - discount
                return PremiumResponse(premium=round(premium, 2))

        raise HTTPException(status_code=400, detail="Invalid insurance category or subtype")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation failed: {str(e)}")
