from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from routes.insurance import router as insurance_router
from routes.auth import router as auth_router  # ✅ Add auth routes

# Create DB tables
Base.metadata.create_all(bind=engine)

# FastAPI app initialization
app = FastAPI(
    title="Premium Insurance Backend API",
    description="Handles premium calculation and user authentication",
    version="1.0.0"
)

# CORS setup to allow frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check route
@app.get("/")
async def root():
    return {"status": "Backend is running 👋"}

# Register routes
app.include_router(insurance_router)
app.include_router(auth_router)  # ✅ Register auth route
