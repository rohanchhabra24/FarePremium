from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()
from routes.insurance import router as insurance_router
from routes.auth import router as auth_router
from routes.ai_assistant import router as ai_router  

from database import Base, engine


#Create DB tables
Base.metadata.create_all(bind=engine)

#Initialize FastAPI App
app = FastAPI(
    title="FairPremium Insurance API",
    description="Handles premium calculation, authentication, and AI explanations",
    version="1.0.0"
)

#CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Update to frontend URL if deployed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Root Health Check
@app.get("/")
async def root():
    return {"message": "Backend is running "}

#Register all API routers
app.include_router(insurance_router)
app.include_router(auth_router)
app.include_router(ai_router)  #Register the AI Assistant route
