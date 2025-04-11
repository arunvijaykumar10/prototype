import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";

// Import MUI icons
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FolderIcon } from "lucide-react";
import AssetAttachmentUploadPanel from "./AssetAttach";
import AutoSyncPanel from "./ToolSync";
import AIReviewSuggestionPanel from "./AIReview";
import ConfirmationScreen from "./Confirmation";

const MarketingOSLayout = () => {
  // Main navigation state
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  // Auto-save status
  const [autoSaveStatus, setAutoSaveStatus] = useState("All changes saved");

  // Mock auto-save function
  const triggerAutoSave = () => {
    setAutoSaveStatus("Saving changes...");
    setTimeout(() => setAutoSaveStatus("All changes saved"), 1500);
  };

  const handleTabChange = (
    _event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <CampaignBriefBuilder
            triggerAutoSave={triggerAutoSave}
            onNext={() => setActiveTab(1)}
          />
        );
      case 1:
        return (
          <AssetAttachmentUploadPanel
            onNext={() => setActiveTab(2)}
            onBackward={() => setActiveTab(-1)}
          />
        );
      case 2:
        return (
          <AutoSyncPanel
            onNext={() => setActiveTab(3)}
            onBackward={() => setActiveTab(-1)}
          />
        );
      case 3:
        return (
          <AIReviewSuggestionPanel
            onNext={() => setActiveTab(4)}
            onBackward={() => setActiveTab(-1)}
          />
        );
      case 4:
        return <ConfirmationScreen onBackward={() => setActiveTab(3)} />;
      default:
        return (
          <CampaignBriefBuilder
            triggerAutoSave={triggerAutoSave}
            onNext={() => setActiveTab(1)}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              component="h1"
              color="primary"
              fontWeight="bold"
            >
              Marketing OS
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <SaveIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {autoSaveStatus}
                </Typography>
              </Stack>
              <Button variant="contained" color="primary" size="small">
                Help
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        {/* Progress Steps */}
        <Box mb={4}>
          <ProgressTracker currentStep={activeStep} />
        </Box>

        {/* Navigation Tabs */}
        <Box mb={3}>
          <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </Box>

        {/* Content Area */}
        {renderContent()}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: 3,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="body2" color="text.secondary">
            Marketing OS v1.0
          </Typography>
          <Typography variant="body2" fontWeight="medium">
            Step 1 of 8: Ingest
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

// Progress Tracker Component
const ProgressTracker = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { label: "Ingest" },
    { label: "Target" },
    { label: "Plan" },
    { label: "Create" },
    { label: "Review" },
    { label: "Personalize" },
    { label: "Launch" },
    { label: "Optimize" },
  ];

  return (
    <Card>
      <CardHeader title="Campaign Workflow" />
      <CardContent>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label} completed={index < currentStep}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </CardContent>
    </Card>
  );
};

// Navigation Tabs Component
const NavigationTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}) => {
  const tabs = [
    { label: "Campaign Brief", icon: <DescriptionIcon /> },
    { label: "Assets & Attachments", icon: <FolderIcon /> },
    { label: "Tool Sync", icon: <AttachMoneyIcon /> },
    { label: "AI Review", icon: <WarningIcon /> },
    { label: "Confirmation", icon: <CheckCircleIcon /> },
  ];

  return (
    <Paper>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  );
};

// Campaign Brief Builder Component (1st screen)
const CampaignBriefBuilder = ({
  triggerAutoSave,
  onNext,
}: {
  triggerAutoSave: () => void;
  onNext: () => void;
}) => {
  const [formData, setFormData] = useState<{
    campaignName: string;
    description: string;
    objective: string;
    startDate: string;
    endDate: string;
    budget: string;
    products: number[];
    notes: string;
  }>({
    campaignName: "",
    description: "",
    objective: "",
    startDate: "",
    endDate: "",
    budget: "",
    products: [],
    notes: "",
  });

  const [showSuggestions, setShowSuggestions] = useState(true);

  const objectives = [
    { value: "awareness", label: "Brand Awareness" },
    { value: "consideration", label: "Consideration" },
    { value: "conversion", label: "Conversion" },
    { value: "retention", label: "Customer Retention" },
    { value: "leadgen", label: "Lead Generation" },
  ];

  const productOptions = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
    { id: 4, name: "Service X" },
    { id: 5, name: "Service Y" },
  ];

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    triggerAutoSave();
  };

  const handleProductToggle = (productId: number) => {
    setFormData((prev) => {
      const newProducts = [...prev.products];
      if (newProducts.includes(productId)) {
        return {
          ...prev,
          products: newProducts.filter((id) => id !== productId),
        };
      } else {
        return { ...prev, products: [...newProducts, productId] };
      }
    });
    triggerAutoSave();
  };

  return (
    <Grid container spacing={3}>
      {/* Main Form Column */}
      <Grid item xs={12} lg={8}>
        <Card>
          <CardHeader title="Campaign Brief Builder" />
          <CardContent>
            <Stack spacing={3}>
              {/* Campaign Name */}
              <TextField
                label="Campaign Name"
                name="campaignName"
                value={formData.campaignName}
                onChange={handleInputChange}
                placeholder="Enter campaign name"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Campaign Description */}
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your campaign objectives and expectations"
                multiline
                rows={3}
                fullWidth
              />

              {/* Campaign Objective */}
              <FormControl fullWidth>
                <InputLabel id="objective-label" required>
                  Campaign Objective
                </InputLabel>
                <Select
                  labelId="objective-label"
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmojiEventsIcon />
                    </InputAdornment>
                  }
                  label="Campaign Objective"
                >
                  <MenuItem value="">Select an objective</MenuItem>
                  {objectives.map((obj) => (
                    <MenuItem key={obj.value} value={obj.value}>
                      {obj.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Timeline */}
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ ml: -2 }}>
                  <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    sx={{ mb: 2, mr: 5 }}
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>

              {/* Budget */}
              <TextField
                label="Budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter campaign budget"
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Products */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Products / Services{" "}
                  <Typography component="span" color="error">
                    *
                  </Typography>
                </Typography>
                <Grid container spacing={1}>
                  {productOptions.map((product) => (
                    <Grid item xs={6} md={4} key={product.id}>
                      <Paper
                        variant="outlined"
                        onClick={() => handleProductToggle(product.id)}
                        sx={{
                          p: 1.5,
                          cursor: "pointer",
                          bgcolor: formData.products.includes(product.id)
                            ? "primary.lighter"
                            : "background.paper",
                          borderColor: formData.products.includes(product.id)
                            ? "primary.main"
                            : "divider",
                          "&:hover": {
                            bgcolor: formData.products.includes(product.id)
                              ? "primary.lighter"
                              : "action.hover",
                          },
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.products.includes(product.id)}
                              onChange={() => handleProductToggle(product.id)}
                              color="primary"
                            />
                          }
                          label={product.name}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Box mt={1}>
                  <TextField
                    placeholder="Or enter custom product/service"
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>

              {/* Internal Notes */}
              <TextField
                label="Internal Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any internal notes or special instructions"
                multiline
                rows={3}
                fullWidth
              />
            </Stack>

            {/* Action Buttons */}
            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="inherit">
                Save Draft
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={onNext}
              >
                Next Step
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Sidebar Column */}
      <Grid item xs={12} lg={4}>
        <Stack spacing={3}>
          {/* AI Assistant Suggestions */}
          {showSuggestions && (
            <Card>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <MessageIcon sx={{ mr: 1, fontSize: 20 }} color="primary" />
                    <Typography variant="subtitle1">
                      AI Assistant Suggestions
                    </Typography>
                  </Box>
                }
                action={
                  <IconButton
                    aria-label="close"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  <Alert severity="warning">
                    <AlertTitle>Missing: Budget</AlertTitle>
                    Previous campaigns with similar objectives had a budget of
                    $5,000-$10,000.
                    <Box mt={1}>
                      <Button size="small" variant="outlined" color="warning">
                        Apply Suggestion
                      </Button>
                    </Box>
                  </Alert>

                  <Alert severity="info">
                    <AlertTitle>Timing Suggestion</AlertTitle>
                    Similar campaigns typically had a 3-week timeline. Your
                    current plan is 10 days.
                    <Box mt={1}>
                      <Button size="small" variant="outlined" color="info">
                        Extend Timeline
                      </Button>
                    </Box>
                  </Alert>

                  <Alert severity="success">
                    <AlertTitle>Success Pattern</AlertTitle>
                    Top-performing campaigns in this category consistently
                    included video assets and weekly email touchpoints.
                    <Box mt={1}>
                      <Button size="small" variant="outlined" color="success">
                        Note for Planning
                      </Button>
                    </Box>
                  </Alert>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Button fullWidth startIcon={<MessageIcon />} color="primary">
                  Ask AI Assistant a Question
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Optional Add-ons */}
          <Card>
            <CardHeader title="Optional Tools" />
            <CardContent>
              <Stack spacing={2}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <MessageIcon sx={{ mr: 1, fontSize: 18 }} color="primary" />
                    AI Copilot
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="small"
                  >
                    Complete Brief Using Template from Previous Campaign
                  </Button>
                </Paper>

                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <PeopleIcon sx={{ mr: 1, fontSize: 18 }} color="primary" />
                    Approver Selection
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select displayEmpty defaultValue="">
                      <MenuItem value="">Select Campaign Approver</MenuItem>
                      <MenuItem value="director">Marketing Director</MenuItem>
                      <MenuItem value="brand">Brand Manager</MenuItem>
                      <MenuItem value="product">
                        Product Marketing Manager
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Paper>
              </Stack>
            </CardContent>
          </Card>

          {/* Version History */}
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} color="action" />
                  <Typography variant="subtitle1">Version History</Typography>
                </Box>
              }
            />
            <CardContent>
              <List dense>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItemText primary="Current Version" />
                  <Typography variant="body2" color="text.secondary">
                    Just now
                  </Typography>
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItemText primary="Draft saved" />
                  <Typography variant="body2" color="text.secondary">
                    10 minutes ago
                  </Typography>
                </ListItem>
                <ListItem sx={{ justifyContent: "space-between" }}>
                  <ListItemText primary="Campaign created" />
                  <Typography variant="body2" color="text.secondary">
                    Yesterday, 3:45 PM
                  </Typography>
                </ListItem>
              </List>
              <Button color="primary" size="small" sx={{ mt: 1 }}>
                View all versions
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MarketingOSLayout;
