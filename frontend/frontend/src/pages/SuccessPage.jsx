import {
    Box, Button, Typography, Card, CardContent, Container
  } from "@mui/material";
  import { CheckCircle } from "@mui/icons-material";
  import { useNavigate, useLocation } from "react-router-dom";
  
  const SuccessPage = () => {
    const { state } = useLocation();
    const { email, selectedPlan } = state || {};
    const navigate = useNavigate();
  
    return (
      <Box sx={{ py: 6, bgcolor: "#f4f6f8" }}>
        <Container maxWidth="sm">
          <Card elevation={3} sx={{ borderRadius: 3, p: 3, textAlign: "center" }}>
            <CardContent>
              <CheckCircle color="success" sx={{ fontSize: 60 }} />
              <Typography variant="h5" fontWeight={600} mt={2}>
                Payment Successful
              </Typography>
              <Typography variant="body1" mt={1}>
                Confirmation sent to: <strong>{email}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                Your plan: <strong>{selectedPlan?.name}</strong> from {selectedPlan?.insurer}
              </Typography>
              <Typography variant="h6" mt={2}>
                ₹{selectedPlan?.premium?.toLocaleString()} / year
              </Typography>
  
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 4 }}
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  };
  
  export default SuccessPage;
  