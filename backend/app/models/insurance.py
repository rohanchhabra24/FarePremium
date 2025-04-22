from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class InsuranceSubmission(Base):
    __tablename__ = "insurance_submissions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, nullable=False)     # "personal" or "business"
    sub_type = Column(String, nullable=False)     # e.g., "Auto", "Health"
    data = Column(Text, nullable=False)           # JSON string of form submission
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # timestamp