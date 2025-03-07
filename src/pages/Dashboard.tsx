import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>Welcome to the Dashboard! 🎉</Typography>
      <Button variant="contained" color="secondary" onClick={() => navigate("/")}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
