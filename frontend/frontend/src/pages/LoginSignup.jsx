import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Container,
  } from "@mui/material";
  import { useState } from "react";
  import { useAuth } from "../context/AuthContext";
  
  const LoginSignup = () => {
    const { login, signup } = useAuth();
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (mode === "login") login(email, password);
      else signup(name, email, password);
    };
  
    return (
      <Box sx={{ py: 6, bgcolor: "#f4f6f8" }}>
        <Container maxWidth="sm">
          <Card elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {mode === "login" ? "Login to Your Account" : "Create an Account"}
              </Typography>
  
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(e, val) => val && setMode(val)}
                fullWidth
                sx={{ my: 2 }}
              >
                <ToggleButton value="login" fullWidth>Login</ToggleButton>
                <ToggleButton value="signup" fullWidth>Sign Up</ToggleButton>
              </ToggleButtonGroup>
  
              <form onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <TextField
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  />
                )}
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                  required
                />
                <Button type="submit" variant="contained" fullWidth>
                  {mode === "login" ? "Login" : "Sign Up"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  };
  
  export default LoginSignup;
  