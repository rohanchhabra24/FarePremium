import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

const MainLayout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
