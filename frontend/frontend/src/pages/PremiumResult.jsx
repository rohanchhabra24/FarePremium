import {
  Box, Card, CardContent, CardHeader, CardActions, Typography, Divider, Button,
  Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem,
  ListItemIcon, ListItemText, Chip, Stack, Container, CircularProgress, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import { ExpandMore, CheckCircle, ArrowBack } from "@mui/icons-material";
import { useInsurance } from "../context/InsuranceContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { generateQuotePDF } from "../utils/pdfGenerator";

const insurerOptions = [
  {
    id: "basic",
    name: "Basic Plan",
    insurer: "TrustShield Insurance",
    multiplier: 1,
    features: ["Essential coverage", "24/7 customer support", "Easy claims process", "Affordable premium"],
  },
  {
    id: "standard",
    name: "Standard Plan",
    insurer: "SecurePlus Insurance",
    multiplier: 1.15,
    features: ["Comprehensive coverage", "Premium customer support", "Fast-track claims", "Value for money"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    insurer: "EliteGuard Insurance",
    multiplier: 1.35,
    features: ["Maximum coverage", "Dedicated relationship manager", "Priority claims settlement", "Premium benefits and add-ons"],
  },
];

const PremiumResult = () => {
  const navigate = useNavigate();
  const { insuranceCategory, insuranceType, formData, setResult } = useInsurance();
  const [basePremium, setBasePremium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("standard");

  const fetchPremium = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/insurance/calculate/", {
        category: insuranceCategory,
        sub_type: insuranceType,
        data: formData,
      });
      setBasePremium(res.data.premium);
      setResult(res.data);
    } catch (err) {
      setError("Failed to fetch premium. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPremium();
  }, []);

  if (loading) {
    return (
      <Box minHeight="70vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  const plans = insurerOptions.map(plan => ({
    ...plan,
    premium: Math.round(basePremium * plan.multiplier)
  }));

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  const handleDownloadQuote = () => {
    const breakdown = {
      "Base Premium": Math.round(basePremium * 0.7),
      "Risk Factors": Math.round(basePremium * 0.2),
      "Taxes & Fees": Math.round(basePremium * 0.1),
      "Total": selectedPlan.premium,
    };

    const terms = [
      "Policy is valid for one year.",
      "Claims subject to verification and documentation.",
      "Premium may vary based on actual underwriting.",
      "Pre-existing conditions may affect claim eligibility.",
    ];

    generateQuotePDF({
      plan: selectedPlan,
      userData: formData,
      premiumBreakdown: breakdown,
      terms,
    });
  };

  const handleGetThisPlan = () => {
    navigate("/payment", {
      state: {
        selectedPlan,
        basePremium,
        formData,
        insuranceCategory,
        insuranceType,
      },
    });
  };

  return (
    <Box sx={{ py: 6, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Button onClick={() => navigate(-1)} startIcon={<ArrowBack />} sx={{ fontWeight: 500 }}>
            Back
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>Start Over</Button>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* 🔘 Plan Selector */}
            <ToggleButtonGroup
              exclusive
              value={selectedPlanId}
              onChange={(e, val) => val && setSelectedPlanId(val)}
              sx={{ mb: 3 }}
            >
              {plans.map((p) => (
                <ToggleButton key={p.id} value={p.id}>
                  {p.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* 💎 Plan Details */}
            <Card elevation={2} sx={{ borderRadius: 3 }}>
              <CardHeader
                title={<Typography variant="h6" fontWeight={600}>{selectedPlan.name}</Typography>}
                subheader={`Offered by ${selectedPlan.insurer}`}
                action={<Chip label="Best Value" color="primary" />}
              />
              <CardContent>
                <Typography variant="h4" fontWeight="bold">
                  ₹{selectedPlan.premium.toLocaleString()} <Typography component="span" variant="body1">/year</Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  or ₹{Math.round(selectedPlan.premium / 12)}/month
                </Typography>

                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" fontWeight={600}>Key Features</Typography>
                <List>
                  {selectedPlan.features.map((feature, i) => (
                    <ListItem key={i} disablePadding>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ gap: 2, px: 2, pb: 2 }}>
                <Button variant="contained" fullWidth size="large" onClick={handleGetThisPlan}>
                  Get This Plan
                </Button>
                <Button variant="outlined" fullWidth size="large" onClick={handleDownloadQuote}>
                  Download Quote
                </Button>
              </CardActions>
            </Card>

            {/* 🔽 Accordion */}
            <Box mt={6}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Policy Benefits Explained</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Benefits based on selected plan will be listed here.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography fontWeight={600}>Terms & Conditions Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Detailed disclaimers based on selected policy.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>

          {/* 💰 Sidebar */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: "sticky", top: 100, borderRadius: 3 }}>
              <CardHeader title={<Typography variant="h6" fontWeight={600}>Premium Breakdown</Typography>} />
              <CardContent>
                <Stack spacing={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Base Premium</Typography>
                    <Typography>₹{Math.round(basePremium * 0.7)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Risk Factors</Typography>
                    <Typography>₹{Math.round(basePremium * 0.2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Taxes & Fees</Typography>
                    <Typography>₹{Math.round(basePremium * 0.1)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" justifyContent="space-between" fontWeight="bold">
                    <Typography>Total Premium</Typography>
                    <Typography>₹{basePremium.toLocaleString()}</Typography>
                  </Box>
                </Stack>
                <Box mt={2} p={2} bgcolor="grey.100" borderRadius={2}>
                  <Typography variant="body2" color="text.secondary">
                    Based on selected plan and input details.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PremiumResult;
