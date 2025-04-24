import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const loginBtnRef = useRef(null);

  useEffect(() => {
    if (location.state?.unauthorized && loginBtnRef.current) {
      const btn = loginBtnRef.current;
      btn.classList.add("shake");
      setTimeout(() => btn.classList.remove("shake"), 600);
    }
  }, [location]);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

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
            <img src="/insurance.png" alt="FairPremium Logo" style={{ height: 28 }} />
            <Typography
              variant="h6"
              component="a"
              href="/home"
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

          {/* Navigation + Auth */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="text" href="/home" sx={{ color: "#4B5563" }}>
              Home
            </Button>
            <Button variant="text" href="/about" sx={{ color: "#4B5563" }}>
              About
            </Button>
            <Button variant="text" href="/contact" sx={{ color: "#4B5563" }}>
              Contact
            </Button>

            {isAuthenticated ? (
              <>
                <IconButton onClick={handleAvatarClick} size="small">
                  <Avatar sx={{ bgcolor: "#1e3a8a" }}>
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {user?.name || user?.email}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                ref={loginBtnRef}
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

      {/* Shake animation for login button */}
      <style>
        {`
          .shake {
            animation: shake 0.5s;
          }
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </AppBar>
  );
};

export default Header;
