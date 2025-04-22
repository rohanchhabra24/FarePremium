import { useInsurance } from "../context/InsuranceContext";
import InsuranceOptionCard from "./InsuranceOptionCard";
import { useEffect } from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const InsuranceSubtypeSelector = () => {
  const { insuranceCategory, setInsuranceType } = useInsurance();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtypes = {
    personal: [
      { label: "Auto", icon: <DirectionsCarIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Car or two-wheeler insurance coverage." },
      { label: "Health", icon: <FavoriteIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Medical and treatment expense coverage." },
      { label: "Life", icon: <FavoriteBorderIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Long-term life security for your loved ones." },
    ],
    business: [
      { label: "Small Business", icon: <StorefrontIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Coverage for small-scale enterprise risks." },
      { label: "Homeowners", icon: <HomeWorkIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Protection for your business property or office." },
      { label: "Fire & Burglary", icon: <LocalFireDepartmentIcon sx={{ fontSize: 50, color: "primary.main" }} />, description: "Protection against fire damage and theft." },
    ],
  };

  if (!insuranceCategory) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" mt={6}>
        Please select a category first.
      </Typography>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 10, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Choose your {insuranceCategory === "personal" ? "Personal" : "Business"} Insurance Type
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {subtypes[insuranceCategory].map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.label}>
              <InsuranceOptionCard
                label={option.label}
                icon={option.icon}
                description={<Typography variant="subtitle1" fontWeight={500} color="text.secondary">{option.description}</Typography>}
                onClick={() => setInsuranceType(option.label)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InsuranceSubtypeSelector;
