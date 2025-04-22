export const INSURANCE_FIELDS = {
  Auto: [
    {
      name: "vehicleType",
      label: "Vehicle Type",
      type: "dropdown",
      options: ["Car", "Bike", "SUV"],
    },
    {
      name: "vehicleAge",
      label: "Age of Vehicle",
      type: "number",
    },
    {
      name: "usage",
      label: "Usage Type",
      type: "dropdown",
      options: ["Personal", "Commercial"],
    },
    {
      name: "drivingHistory",
      label: "Driving History",
      type: "dropdown",
      options: ["No accidents", "1 accident", "2 accidents", "3+ accidents"],
    },
    {
      name: "city",
      label: "City",
      type: "dropdown",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
  ],

  Health: [
    {
      name: "age",
      label: "Your Age",
      type: "number",
    },
    {
      name: "conditions",
      label: "Pre-existing Conditions",
      type: "multi-select",
      options: [
        "Diabetes",
        "Hypertension",
        "Asthma",
        "Cancer",
        "Heart Disease",
        "Thyroid",
        "Arthritis",
        "Obesity",
        "Cholesterol",
        "None",
      ],
    },
    {
      name: "members",
      label: "Number of Members to Insure",
      type: "number",
    },
    {
      name: "city",
      label: "City",
      type: "dropdown",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
    {
      name: "habits",
      label: "Smoking or Drinking Habits",
      type: "dropdown",
      options: ["None", "Smoking", "Alcohol", "Both"],
    },
  ],

  Life: [
    {
      name: "age",
      label: "Age",
      type: "number",
    },
    {
      name: "coverageAmount",
      label: "Coverage Amount (in ₹)",
      type: "number",
    },
    {
      name: "termLength",
      label: "Policy Term Length (in years)",
      type: "dropdown",
      options: ["5", "10", "15", "20", "30"],
    },
    {
      name: "smoker",
      label: "Are you a smoker?",
      type: "dropdown",
      options: ["Yes", "No"],
    },
    {
      name: "city",
      label: "City",
      type: "dropdown",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
  ],

  "Small Business": [
    {
      name: "businessType",
      label: "Type of Business",
      type: "dropdown",
      options: ["IT", "Manufacturing", "Retail", "Education", "Healthcare"],
    },
    {
      name: "revenue",
      label: "Annual Revenue (in ₹)",
      type: "number",
    },
    {
      name: "employees",
      label: "Number of Employees",
      type: "number",
    },
    {
      name: "riskFactor",
      label: "Industry Risk Level",
      type: "dropdown",
      options: ["Low", "Medium", "High"],
    },
  ],

  Homeowners: [
    {
      name: "propertyValue",
      label: "Property Value (in ₹)",
      type: "number",
    },
    {
      name: "location",
      label: "Property Location",
      type: "dropdown",
      options: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"],
    },
    {
      name: "buildingAge",
      label: "Age of the Building",
      type: "number",
    },
    {
      name: "constructionType",
      label: "Construction Type",
      type: "dropdown",
      options: ["Concrete", "Brick", "Wood"],
    },
    {
      name: "security",
      label: "Security Features",
      type: "multi-select",
      options: ["CCTV", "Guards", "Fire Alarm"],
    },
  ],

  "Fire & Burglary": [
    {
      name: "propertyType",
      label: "Property Type",
      type: "dropdown",
      options: ["Residential", "Commercial"],
    },
    {
      name: "safetyFeatures",
      label: "Safety Features",
      type: "multi-select",
      options: ["Extinguisher", "Exit Routes", "Emergency Lighting"],
    },
    {
      name: "insuredValue",
      label: "Insured Goods Value (in ₹)",
      type: "number",
    },
    {
      name: "crimeRate",
      label: "Location Crime Rate",
      type: "dropdown",
      options: ["Low", "Moderate", "High"],
    },
  ],
};
