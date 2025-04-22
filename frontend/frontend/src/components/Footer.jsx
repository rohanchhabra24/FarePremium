import { Box, Container, Typography, Link, Stack } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 8,
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} InsureSmart. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="#" underline="hover" color="text.secondary">
              Terms
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Privacy
            </Link>
            <Link href="#" underline="hover" color="text.secondary">
              Support
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
