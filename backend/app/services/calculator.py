# services/calculator.py

from schemas.insurance import (
    AutoInsuranceRequest,
    LifeHealthInsuranceRequest,
    SmallBusinessInsuranceRequest,
    HomeownersInsuranceRequest,
    FireBurglaryInsuranceRequest
)

#  Auto
def calculate_auto_premium(data: AutoInsuranceRequest) -> float:
    base = 3000

    if data.vehicleType == "SUV":
        base += 1200
    elif data.vehicleType == "Bike":
        base -= 500

    if data.usage == "Commercial":
        base += 1500

    accident_penalty = {
        "No accidents": 0,
        "1 accident": 800,
        "2 accidents": 1500,
        "3+ accidents": 2500,
    }
    base += accident_penalty.get(data.drivingHistory, 0)

    city_multiplier = {
        "Delhi": 1.2,
        "Mumbai": 1.3,
        "Bangalore": 1.1,
        "Chennai": 1.05,
        "Hyderabad": 1.0
    }

    premium = base + (data.vehicleAge * 100)
    return round(premium * city_multiplier.get(data.city, 1.0), 2)


# Life / Health
def calculate_life_health_premium(data: LifeHealthInsuranceRequest) -> float:
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

    return round(base * city_risk.get(data.city, 1.0), 2)


#  Small Business
def calculate_small_business_premium(data: SmallBusinessInsuranceRequest) -> float:
    multiplier = {"Low": 1.0, "Medium": 1.5, "High": 2.0}
    premium = (data.revenue * 0.01) + (data.employees * 150)
    return round(premium * multiplier.get(data.riskFactor, 1.0), 2)


#  Homeowners
def calculate_homeowners_premium(data: HomeownersInsuranceRequest) -> float:
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

    return round(base, 2)


#  Fire & Burglary
def calculate_fire_burglary_premium(data: FireBurglaryInsuranceRequest) -> float:
    crime_rate_mult = {"Low": 1.1, "Moderate": 1.5, "High": 2.0}
    safety_discount = 0

    if "Extinguisher" in data.safetyFeatures:
        safety_discount += 200
    if "Exit Routes" in data.safetyFeatures:
        safety_discount += 300

    premium = (data.insuredValue * 0.02 * crime_rate_mult.get(data.crimeRate, 1.0)) - safety_discount
    return round(premium, 2)
