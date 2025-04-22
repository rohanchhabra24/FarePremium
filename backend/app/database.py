from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL – you can later move this to a .env file for production
DATABASE_URL = "sqlite:///./insurance.db"

# Create the engine with required SQLite argument
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for model definitions
Base = declarative_base()

# Dependency to get DB session in routes/services
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

