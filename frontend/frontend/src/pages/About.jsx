import {
    Box,
    Typography,
    Container,
    Card,
    CardContent,
    Grid,
    Paper,
    Stack,
  } from "@mui/material";
  import InsightsIcon from "@mui/icons-material/Insights";
  import ShieldIcon from "@mui/icons-material/Shield";
  import FlashOnIcon from "@mui/icons-material/FlashOn";
  import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
  
  const highlights = [
    {
      icon: <ShieldIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
      title: "Smart Insurance Matching",
      desc: "We help you discover the most relevant policies based on your lifestyle and needs.",
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
      title: "AI-Powered Insights",
      desc: "Break down your premium with clarity using advanced AI algorithms.",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
      title: "Lightning Fast Quotes",
      desc: "Get real-time insurance quotes with transparent pricing, instantly.",
    },
    {
      icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: "#1e3a8a" }} />,
      title: "Built with Innovation",
      desc: "We leverage AI, automation, and great design to make insurance feel intuitive.",
    },
  ];
  
  const About = () => {
    return (
      <Box sx={{ py: 6, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
        <Container maxWidth="md">
          {/* Main Intro Card */}
          <Card sx={{ borderRadius: 3, mb: 6 }}>
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
  
          {/* Highlights with Icons */}
          <Typography variant="h5" fontWeight={600} align="center" mb={4}>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4}>
            {highlights.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {item.icon}
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default About;
  