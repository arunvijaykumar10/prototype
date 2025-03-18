import { Container, Typography, Tabs, Tab, Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabData = [
  { label: "Home", content: "Home Content" },
  { label: "Profile", content: "Profile Content" },
  { label: "Settings", content: "Settings Content" },
  { label: "Notifications", content: "Notifications Content" },
  { label: "Messages", content: "Messages Content" },
  { label: "Analytics", content: "Analytics Content" },
  { label: "Reports", content: "Reports Content" },
  { label: "Users", content: "Users Content" },
  { label: "Help", content: "Help & Support" }
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard! 🎉
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 3, flexWrap: "wrap" }}
      >
        {tabData.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Box>
        <Typography>{tabData[activeTab]?.content}</Typography>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
        sx={{ mt: 3 }}
      >
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
