import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { X, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { styled } from "@mui/material/styles";

// Styled components
const ToolCard = styled(Paper)<{ selected?: boolean }>(
  ({ theme, selected }) => ({
    padding: theme.spacing(2),
    border: "1px solid",
    borderColor: selected ? theme.palette.primary.light : theme.palette.divider,
    backgroundColor: selected
      ? theme.palette.primary.light
      : theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "&:hover": {
      backgroundColor: selected
        ? theme.palette.primary.light
        : theme.palette.action.hover,
    },
  })
);

const ToolLogo = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  backgroundColor: theme.palette.action.hover,
  marginBottom: theme.spacing(1),
  fontWeight: "medium",
}));

const DataTypeLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  width: "100%",
  "& .MuiFormControlLabel-label": {
    width: "100%",
  },
}));

const DataTypeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: "flex",
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// AddIntegrationModal Component
interface AddIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddIntegrationModal: React.FC<AddIntegrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTool, setSelectedTool] = useState<{
    id: string;
    name: string;
    type: string;
    logo: string;
  } | null>(null);
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [syncFrequency, setSyncFrequency] = useState("hourly");

  if (!isOpen) return null;

  const tools = [
    { id: "salesforce", name: "Salesforce", type: "CRM", logo: "SF" },
    { id: "hubspot", name: "HubSpot", type: "CRM", logo: "HS" },
    { id: "segment", name: "Segment", type: "CDP", logo: "SG" },
    { id: "adobe-cdp", name: "Adobe CDP", type: "CDP", logo: "AD" },
    { id: "workfront", name: "Workfront", type: "CMP", logo: "WF" },
    { id: "airtable", name: "Airtable", type: "CMP", logo: "AT" },
    { id: "sitecore", name: "Sitecore", type: "CMS", logo: "SC" },
    { id: "wordpress", name: "WordPress", type: "CMS", logo: "WP" },
    { id: "bynder", name: "Bynder", type: "DAM", logo: "BY" },
    { id: "adobe-dam", name: "Adobe DAM", type: "DAM", logo: "AD" },
    { id: "meta", name: "Meta Ads", type: "AdPlatform", logo: "FB" },
    { id: "google-ads", name: "Google Ads", type: "AdPlatform", logo: "GA" },
  ];

  const dataTypes = [
    { id: "contacts", name: "Contacts" },
    { id: "campaign-briefs", name: "Campaign Briefs" },
    { id: "creative-assets", name: "Creative Assets" },
    { id: "audiences", name: "Audiences" },
    { id: "products", name: "Products" },
  ];

  const frequencies = [
    { id: "realtime", name: "Real-time" },
    { id: "hourly", name: "Hourly" },
    { id: "daily", name: "Daily" },
    { id: "weekly", name: "Weekly" },
  ];

  const handleToolSelect = (
    tool: React.SetStateAction<{
      id: string;
      name: string;
      type: string;
      logo: string;
    } | null>
  ) => {
    setSelectedTool(tool);
  };

  const handleDataTypeToggle = (dataTypeId: string) => {
    setSelectedDataTypes((prev) =>
      prev.includes(dataTypeId)
        ? prev.filter((id) => id !== dataTypeId)
        : [...prev, dataTypeId]
    );
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConnect = () => {
    // In a real app, this would handle the integration creation
    console.log("Creating integration with:", {
      tool: selectedTool,
      dataTypes: selectedDataTypes,
      syncFrequency,
    });
    onClose();
  };

  const getStepDescription = (dataTypeId: string) => {
    switch (dataTypeId) {
      case "contacts":
        return "Customer profiles, leads, and account information";
      case "campaign-briefs":
        return "Marketing campaign details and assets";
      case "creative-assets":
        return "Images, videos, and design files";
      case "audiences":
        return "Customer segments and targeting groups";
      case "products":
        return "Product catalog and inventory data";
      default:
        return "";
    }
  };

  const getFrequencyDescription = (frequencyId: string) => {
    switch (frequencyId) {
      case "realtime":
        return "Immediate updates as data changes";
      case "hourly":
        return "Updates every hour on the hour";
      case "daily":
        return "Updates once per day at midnight UTC";
      case "weekly":
        return "Updates once per week on Monday at midnight UTC";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Box>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Choose Tool Type
            </Typography>
            <Grid container spacing={2}>
              {tools.map((tool) => (
                <Grid item xs={12} sm={6} md={4} key={tool.id}>
                  <ToolCard
                    selected={selectedTool?.id === tool.id}
                    onClick={() => handleToolSelect(tool)}
                    elevation={0}
                  >
                    <ToolLogo>{tool.logo}</ToolLogo>
                    <Typography variant="body1" fontWeight="medium">
                      {tool.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {tool.type}
                    </Typography>
                  </ToolCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Authentication Settings
            </Typography>
            <Paper
              variant="outlined"
              sx={{ p: 2, mb: 3, bgcolor: "action.hover", borderRadius: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "action.selected",
                    mr: 1.5,
                  }}
                >
                  {selectedTool?.logo}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedTool?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedTool?.type}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Stack spacing={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Authentication Method</InputLabel>
                <Select defaultValue="oauth" label="Authentication Method">
                  <MenuItem value="oauth">OAuth 2.0</MenuItem>
                  <MenuItem value="apikey">API Key</MenuItem>
                  <MenuItem value="userpass">Username/Password</MenuItem>
                  <MenuItem value="sso">SSO</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Client ID"
                variant="outlined"
                placeholder="Enter client ID"
              />

              <TextField
                fullWidth
                label="Client Secret"
                variant="outlined"
                type="password"
                placeholder="Enter client secret"
              />

              <TextField
                fullWidth
                label="Redirect URI"
                variant="outlined"
                placeholder="https://your-app.com/callback"
              />
            </Stack>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Select Data Types to Sync
            </Typography>
            <Stack spacing={1.5}>
              {dataTypes.map((dataType) => (
                <DataTypeBox variant="outlined" key={dataType.id}>
                  <DataTypeLabel
                    control={
                      <Checkbox
                        checked={selectedDataTypes.includes(dataType.id)}
                        onChange={() => handleDataTypeToggle(dataType.id)}
                      />
                    }
                    label={
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {dataType.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getStepDescription(dataType.id)}
                        </Typography>
                      </Box>
                    }
                  />
                </DataTypeBox>
              ))}
            </Stack>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Set Sync Frequency
            </Typography>
            <RadioGroup
              value={syncFrequency}
              onChange={(e) => setSyncFrequency(e.target.value)}
            >
              <Stack spacing={1.5}>
                {frequencies.map((frequency) => (
                  <Paper
                    key={frequency.id}
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      borderColor:
                        syncFrequency === frequency.id
                          ? "primary.light"
                          : "divider",
                      bgcolor:
                        syncFrequency === frequency.id
                          ? "primary.lightest"
                          : "background.paper",
                      "&:hover": {
                        bgcolor:
                          syncFrequency === frequency.id
                            ? "primary.lightest"
                            : "action.hover",
                      },
                    }}
                  >
                    <FormControlLabel
                      value={frequency.id}
                      control={<Radio />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="body1" fontWeight="medium">
                            {frequency.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {getFrequencyDescription(frequency.id)}
                          </Typography>
                        </Box>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Paper>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        );
      case 5:
        return (
          <Box>
            <Typography variant="h6" fontWeight="medium" mb={2}>
              Review & Confirm Setup
            </Typography>
            <Paper
              variant="outlined"
              sx={{ p: 3, mb: 3, bgcolor: "action.hover", borderRadius: 2 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "action.selected",
                    mr: 1.5,
                  }}
                >
                  {selectedTool?.logo}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedTool?.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {selectedTool?.type}
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="text.secondary"
                    gutterBottom
                  >
                    Data Types to Sync:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedDataTypes.map((dataTypeId) => {
                      const dataType = dataTypes.find(
                        (dt) => dt.id === dataTypeId
                      );
                      return (
                        <Chip
                          key={dataTypeId}
                          label={dataType?.name}
                          size="small"
                          color="primary"
                          sx={{ borderRadius: 1 }}
                        />
                      );
                    })}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="text.secondary"
                    gutterBottom
                  >
                    Sync Frequency:
                  </Typography>
                  <Typography variant="body1">
                    {frequencies.find((f) => f.id === syncFrequency)?.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    color="text.secondary"
                    gutterBottom
                  >
                    Authentication:
                  </Typography>
                  <Typography variant="body1">OAuth 2.0</Typography>
                </Box>
              </Stack>
            </Paper>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircle
                color="success"
                size={24}
                style={{ marginRight: 8 }}
              />
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Ready to Connect
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click "Connect & Save" to finalize the integration setup.
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  const steps = [
    "Choose Tool",
    "Auth Flow",
    "Data Types",
    "Frequency",
    "Review",
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Add New Integration
        </Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <X />
        </IconButton>
      </DialogTitle>

      {/* Progress Steps */}
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
        <Stepper activeStep={currentStep - 1}>
          {steps.map((label, index) => {
            const stepCompleted = currentStep > index + 1;
            return (
              <Step key={label} completed={stepCompleted}>
                <StepLabel
                  StepIconProps={{
                    icon: stepCompleted ? <CheckCircle size={20} /> : index + 1,
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {/* Content */}
      <DialogContent dividers sx={{ flexGrow: 1, overflow: "auto" }}>
        {renderStepContent()}
      </DialogContent>

      {/* Footer */}
      <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={currentStep === 1 ? onClose : handleBack}
          startIcon={currentStep !== 1 && <ChevronLeft size={16} />}
        >
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>

        <Button
          variant="contained"
          color={currentStep === 5 ? "success" : "primary"}
          onClick={currentStep === 5 ? handleConnect : handleNext}
          disabled={!selectedTool && currentStep === 1}
          endIcon={currentStep !== 5 && <ChevronRight size={16} />}
        >
          {currentStep === 5 ? "Connect & Save" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIntegrationModal;
