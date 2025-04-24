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
    CircularProgress,
  } from "@mui/material";
  import { useState } from "react";
  import { useAuth } from "../context/AuthContext";
  
  const LoginSignup = () => {
    const { login, signup } = useAuth();
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Basic validation
      if (!email.endsWith("@gmail.com")) return alert("Use a valid Gmail address.");
      if (password.length < 6) return alert("Password should be at least 6 characters.");
  
      setLoading(true);
      try {
        if (mode === "login") {
          await login(email, password);
        } else {
          if (!name.trim()) return alert("Name is required for Sign Up.");
          await signup(name, email, password);
        }
      } catch (err) {
        console.error(err);
        alert("Authentication failed. Please check your credentials.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box sx={{ py: 6, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
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
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  {loading
                    ? <CircularProgress size={24} color="inherit" />
                    : mode === "login" ? "Login" : "Sign Up"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  };
  
  export default LoginSignup;
  