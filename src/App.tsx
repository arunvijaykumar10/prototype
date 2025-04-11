import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MarketingOSLayout from "./pages/CampaignWorkFlow";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MainLayout from "./pages/ConnectionHub";
import HubIcon from "@mui/icons-material/Hub";

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap>
              Drylogics
            </Typography>
          </Toolbar>
          <Sidebar />
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/marketing-os" element={<MarketingOSLayout />} />
            <Route path="/connectionhub" element={<MainLayout />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Campaign Setup", icon: <DashboardIcon />, path: "/marketing-os" },
    { text: "Connection Hub", icon: <HubIcon />, path: "/connectionhub" },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} onClick={() => navigate(item.path)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
}

export default App;
