import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useLocation, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import { sendConfirmationEmail } from "../utils/sendEmail"; // 🔑 EmailJS wrapper
  
  const PaymentGateway = () => {
    const { state } = useLocation();
    const { selectedPlan, formData, insuranceCategory, insuranceType } = state || {};
    const [email, setEmail] = useState("");
    const [card, setCard] = useState({
      number: "",
      name: "",
      expiry: "",
      cvv: "",
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setCard({ ...card, [e.target.name]: e.target.value });
    };
  
    const validateInputs = () => {
      const emailRegex = /^[^\s@]+@gmail\.com$/i;
      const cardNumberRegex = /^\d{12}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3}$/;
  
      if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid Gmail address (e.g., example@gmail.com).");
        return false;
      }
  
      if (!card.number || !cardNumberRegex.test(card.number)) {
        alert("Card number must be exactly 12 digits.");
        return false;
      }
  
      if (!card.expiry || !expiryRegex.test(card.expiry)) {
        alert("Expiry must be in MM/YY format.");
        return false;
      }
  
      const [expMonth, expYear] = card.expiry.split("/").map(Number);
      const currentDate = new Date();
      const expiryDate = new Date(`20${expYear}`, expMonth - 1);
  
      if (expiryDate < currentDate) {
        alert("Expiry date cannot be in the past.");
        return false;
      }
  
      if (!card.cvv || !cvvRegex.test(card.cvv)) {
        alert("CVV must be exactly 3 digits.");
        return false;
      }
  
      if (!card.name.trim()) {
        alert("Cardholder name is required.");
        return false;
      }
  
      return true;
    };
  
    const handlePayment = async () => {
      if (!validateInputs()) return;
  
      try {
        const templateParams = {
          user_name: card.name || "Customer",
          user_email: email,
          insurance_type: insuranceType,
          plan_name: selectedPlan.name,
          insurer: selectedPlan.insurer,
          premium_amount: selectedPlan.premium,
        };
  
        await sendConfirmationEmail(templateParams);
        console.log("Email sent successfully");
  
        navigate("/success", {
          state: {
            email,
            selectedPlan,
            formData,
            insuranceCategory,
            insuranceType,
          },
        });
      } catch (error) {
        console.error("Email sending failed:", error);
        alert("Something went wrong while sending email. Please try again.");
      }
    };
  
    return (
      <Box sx={{ py: 6, bgcolor: "#f4f6f8" }}>
        <Container maxWidth="sm">
          <Card elevation={3} sx={{ borderRadius: 3, p: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Enter Payment Details
              </Typography>
  
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                sx={{ mt: 2 }}
                required
              />
  
              <TextField
                label="Card Number"
                name="number"
                fullWidth
                value={card.number}
                onChange={handleChange}
                sx={{ mt: 2 }}
                inputProps={{ maxLength: 12 }}
              />
              <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                  <TextField
                    label="Expiry (MM/YY)"
                    name="expiry"
                    fullWidth
                    value={card.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    inputProps={{ maxLength: 5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="CVV"
                    name="cvv"
                    fullWidth
                    type="password"
                    value={card.cvv}
                    onChange={handleChange}
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
              </Grid>
  
              <TextField
                label="Cardholder Name"
                name="name"
                fullWidth
                value={card.name}
                onChange={handleChange}
                sx={{ mt: 2 }}
                required
              />
  
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
                onClick={handlePayment}
              >
                Pay ₹{selectedPlan?.premium?.toLocaleString()}
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  };
  
  export default PaymentGateway;
  