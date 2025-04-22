import { Box, Typography, Container, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ py: 6, bgcolor: "#f4f6f8" }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight={600} gutterBottom>
              About FairPremium
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
              FairPremium is your intelligent insurance assistant that helps you find the right policy,
              understand premiums, and get tailored quotes—all within seconds.
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={2}>
              Powered by advanced AI models and premium calculation logic, we strive to make insurance simple,
              transparent, and fair for every user.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default About;
