import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack
} from "@mui/material";

const InsuranceOptionCard = ({ label, icon, onClick, description }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        textAlign: "center",
        boxShadow: 3,
        transition: "0.3s",
        height: "100%",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: "100%" }}>
        <CardContent>
          <Stack spacing={1} alignItems="center">
            {icon}
            <Typography variant="h6" fontWeight={600}>
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {description}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default InsuranceOptionCard;
