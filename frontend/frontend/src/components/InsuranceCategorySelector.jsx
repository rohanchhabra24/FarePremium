import { useInsurance } from "../context/InsuranceContext";
import InsuranceOptionCard from "./InsuranceOptionCard";
import { Typography, Grid, Box, Container, Stack } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BusinessIcon from '@mui/icons-material/Business';

const InsuranceCategorySelector = () => {
  const { setInsuranceCategory } = useInsurance();

  const handleCategorySelect = (type) => setInsuranceCategory(type);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 8, md: 12 },
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight={700}
          color="text.primary"
          align="center"
          gutterBottom
        >
          What type of insurance are you looking for?
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ maxWidth: 600, mx: "auto", mb: 6 }}
        >
          Select between personal or business insurance to start customizing your policy based on your needs.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <InsuranceOptionCard
              label="Personal Insurance"
              icon={<PersonOutlineIcon sx={{ fontSize: 60, color: "primary.main" }} />}
              onClick={() => handleCategorySelect("personal")}
              description="Insurance solutions for individuals and families"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InsuranceOptionCard
              label="Business Insurance"
              icon={<BusinessIcon sx={{ fontSize: 60, color: "primary.main" }} />}
              onClick={() => handleCategorySelect("business")}
              description="Insurance solutions for companies and organizations"
            />
          </Grid>
        </Grid>

        <Box mt={10}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              Not sure which to choose?
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ maxWidth: 500 }}>
              Our smart assistant can help guide you through the right insurance options tailored to your needs and goals.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default InsuranceCategorySelector;
