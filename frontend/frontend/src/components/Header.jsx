import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 2 }}>
          {/* Logo & Brand */}
          <Box display="flex" alignItems="center" gap={1}>
            <img
              src="/insurance.png"
              alt="FairPremium Logo"
              style={{ height: 28 }}
            />
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                color: "#111827",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "1.25rem",
              }}
            >
              FairPremium
            </Typography>
          </Box>

          {/* Navigation */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="text" href="/" sx={{ color: "#4B5563" }}>
              Home
            </Button>
            <Button variant="text" href="/about" sx={{ color: "#4B5563" }}>
              About
            </Button>
            <Button variant="text" href="contact" sx={{ color: "#4B5563" }}>
              Contact
            </Button>

            {/* 🔐 Auth Logic */}
            {isAuthenticated ? (
              <Button
                variant="contained"
                startIcon={<LogoutIcon />}
                onClick={logout}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#ef4444",
                  ":hover": { backgroundColor: "#dc2626" },
                  borderRadius: "8px",
                  fontWeight: 500,
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                startIcon={<LockOpenIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0ea5e9",
                  ":hover": { backgroundColor: "#0284c7" },
                  borderRadius: "8px",
                  fontWeight: 500,
                }}
              >
                Login / Sign Up
              </Button>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
