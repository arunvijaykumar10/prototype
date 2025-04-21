import  { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Alert,
  AlertTitle,
  Stack,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Tag,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface ConfirmationScreenProps {
  onBackward: () => void;
}

const ConfirmationScreen = ({ onBackward }: ConfirmationScreenProps) => {
  // State for section collapse
  const [sections, setSections] = useState({
    campaignDetails: true,
    attachedAssets: false,
    importedData: false,
    aiRecommendations: false,
  });

  // Toggle section visibility
  const toggleSection = (section: keyof typeof sections) => {
    setSections({
      ...sections,
      [section]: !sections[section],
    });
  };

  // Mock campaign data
  const campaignData = {
    name: "Q2 Product Launch - Enterprise Focus",
    owner: "Jane Smith",
    timeline: "June 1 - July 15, 2025 (6 weeks)",
    objective: "Lead Generation",
    product: "Product A",
    budget: "$18,500",
    target: "Enterprise IT Decision-Makers",
    channels: "Email, LinkedIn, Webinars",
  };

  // Mock attached assets
  const assets = [
    { name: "brand_guidelines_2025.pdf", type: "pdf", size: "3.2 MB" },
    { name: "campaign_hero_image.jpg", type: "image", size: "1.8 MB" },
    { name: "product_demo.mp4", type: "video", size: "12.5 MB" },
  ];

  // Mock imported data
  const importedData = [
    { field: "Campaign ID", value: "MKT-2025-Q2-105", source: "Workfront" },
    { field: "Budget Code", value: "Q2-DGT-ENT", source: "Airtable" },
    {
      field: "Project Owner",
      value: "jane.smith@company.com",
      source: "Workfront",
    },
  ];

  // Mock AI recommendations
  const aiRecommendations = [
    {
      type: "Critical Issue",
      content: "Target audience needs to be defined",
      status: "Resolved",
    },
    {
      type: "Suggestion",
      content: "Increase campaign timeline by 1-2 weeks for optimal results",
      status: "Applied",
    },
    {
      type: "Suggestion",
      content: "Include webinars based on past performance",
      status: "Applied",
    },
  ];

  // Open issues
  const openIssues = [
    {
      id: 1,
      title: "Budget breakdown by channel not specified",
      severity: "warning",
    },
    { id: 2, title: "Success metrics need to be defined", severity: "warning" },
  ];

  return (
    <Paper elevation={1} sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={3}>
          Campaign Intake Overview
        </Typography>

        <Box mb={3}>
          <Alert
            severity="info"
            sx={{
              mb: 2,
              borderRadius: 2,
              "& .MuiAlert-message": { width: "100%" },
            }}
          >
            <AlertTitle sx={{ fontSize: "0.875rem", fontWeight: "medium" }}>
              Campaign Ready for Planning
            </AlertTitle>
            <Typography variant="body2" color="text.secondary">
              Your campaign brief has been prepared and is ready to move to the
              Targeting phase. Review the summary below and submit when ready.
            </Typography>
          </Alert>

          {/* Campaign Details Section */}
          <Paper
            variant="outlined"
            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "action.hover",
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleSection("campaignDetails")}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Campaign Details
              </Typography>
              <IconButton size="small" color="primary" sx={{ p: 0 }}>
                {sections.campaignDetails ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </IconButton>
            </Box>

            <Collapse in={sections.campaignDetails}>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Campaign Name
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Campaign Owner
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.owner}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Timeline
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.timeline}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Objectives
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.objective}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Products
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.product}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Budget
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.budget}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Target Audience
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.target}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mb={0.5}
                    >
                      Channels
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {campaignData.channels}
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  color="primary"
                  size="small"
                  sx={{ mt: 1.5, textTransform: "none", fontSize: "0.75rem" }}
                >
                  Edit Campaign Details
                </Button>
              </Box>
            </Collapse>
          </Paper>

          {/* Attached Assets Section */}
          <Paper
            variant="outlined"
            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "action.hover",
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleSection("attachedAssets")}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Attached Assets
              </Typography>
              <IconButton size="small" color="primary" sx={{ p: 0 }}>
                {sections.attachedAssets ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </IconButton>
            </Box>

            <Collapse in={sections.attachedAssets}>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  {assets.map((asset, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {asset.type === "pdf" && (
                          <FileText
                            size={16}
                            color="#f56565"
                            style={{ marginRight: 8 }}
                          />
                        )}
                        {asset.type === "image" && (
                          <Tag
                            size={16}
                            color="#3182ce"
                            style={{ marginRight: 8 }}
                          />
                        )}
                        {asset.type === "video" && (
                          <Tag
                            size={16}
                            color="#9f7aea"
                            style={{ marginRight: 8 }}
                          />
                        )}
                        <Typography variant="body2">{asset.name}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {asset.size}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  color="primary"
                  size="small"
                  sx={{ mt: 1.5, textTransform: "none", fontSize: "0.75rem" }}
                >
                  Manage Assets
                </Button>
              </Box>
            </Collapse>
          </Paper>

          {/* Imported Data Section */}
          <Paper
            variant="outlined"
            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "action.hover",
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleSection("importedData")}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Imported Data
              </Typography>
              <IconButton size="small" color="primary" sx={{ p: 0 }}>
                {sections.importedData ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </IconButton>
            </Box>

            <Collapse in={sections.importedData}>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  {importedData.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          component="span"
                        >
                          {item.field}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="span"
                          sx={{ ml: 1 }}
                        >
                          from {item.source}
                        </Typography>
                      </Box>
                      <Typography variant="body2">{item.value}</Typography>
                    </Box>
                  ))}
                </Stack>

                <Button
                  color="primary"
                  size="small"
                  sx={{ mt: 1.5, textTransform: "none", fontSize: "0.75rem" }}
                >
                  Refresh Data
                </Button>
              </Box>
            </Collapse>
          </Paper>

          {/* AI Recommendations Section */}
          <Paper
            variant="outlined"
            sx={{ mb: 2, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                p: 2,
                bgcolor: "action.hover",
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleSection("aiRecommendations")}
            >
              <Typography variant="subtitle2" color="text.secondary">
                AI Recommendations
              </Typography>
              <IconButton size="small" color="primary" sx={{ p: 0 }}>
                {sections.aiRecommendations ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </IconButton>
            </Box>

            <Collapse in={sections.aiRecommendations}>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  {aiRecommendations.map((rec, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                        bgcolor: "action.hover",
                        borderRadius: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        {rec.type === "Critical Issue" ? (
                          <AlertCircle
                            size={16}
                            color="#f56565"
                            style={{ marginRight: 8, marginTop: 2 }}
                          />
                        ) : (
                          <MessageSquare
                            size={16}
                            color="#3182ce"
                            style={{ marginRight: 8, marginTop: 2 }}
                          />
                        )}
                        <Typography variant="body2">{rec.content}</Typography>
                      </Box>
                      <Chip
                        label={rec.status}
                        size="small"
                        color={
                          rec.status === "Resolved" || rec.status === "Applied"
                            ? "success"
                            : "warning"
                        }
                        sx={{ fontSize: "0.7rem" }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Paper>
        </Box>

        {/* Open Issues Warning */}
        <Alert
          severity="warning"
          icon={<AlertCircle size={20} />}
          sx={{
            mb: 3,
            borderRadius: 2,
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <AlertTitle sx={{ fontSize: "0.875rem", fontWeight: "medium" }}>
            Open Issues ({openIssues.length})
          </AlertTitle>
          <Typography variant="body2" color="text.secondary">
            There are still {openIssues.length} unresolved issues with your
            campaign. You can continue, but addressing these issues is
            recommended for optimal campaign performance.
          </Typography>
          <List dense disablePadding sx={{ mt: 0.5, mb: 1 }}>
            {openIssues.map((issue) => (
              <ListItem key={issue.id} disablePadding sx={{ py: 0.25 }}>
                <ListItemText
                  primary={`• ${issue.title}`}
                  primaryTypographyProps={{
                    variant: "caption",
                    color: "warning.dark",
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            sx={{
              mt: 0.5,
              textTransform: "none",
              fontSize: "0.75rem",
            }}
          >
            Resolve Issues
          </Button>
        </Alert>

        {/* Optional Add-ons */}
        <Box mb={3}>
          <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
            Optional Settings
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  color="text.secondary"
                  mb={1}
                  display="block"
                >
                  AI Copilot
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    textTransform: "none",
                    fontSize: "0.75rem",
                  }}
                >
                  Complete Brief Using Template from Previous Campaign
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight="medium"
                  color="text.secondary"
                  mb={1}
                  display="block"
                >
                  Approver Selection
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    defaultValue=""
                    displayEmpty
                    inputProps={{ "aria-label": "Select Campaign Approver" }}
                    sx={{ fontSize: "0.75rem" }}
                  >
                    <MenuItem value="" sx={{ fontSize: "0.75rem" }}>
                      Select Campaign Approver
                    </MenuItem>
                    <MenuItem
                      value="marketing-director"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      Marketing Director
                    </MenuItem>
                    <MenuItem
                      value="brand-manager"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      Brand Manager
                    </MenuItem>
                    <MenuItem
                      value="product-marketing"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      Product Marketing Manager
                    </MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Workflow Status */}
        <Paper
          variant="outlined"
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: "action.hover",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "primary.lightest",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 1.5,
              }}
            >
              <CheckCircle size={16} color="#1976d2" />
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Step 1 of 8: Ingest ✅
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Next: Step 2 - Target
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Button variant="outlined" color="inherit" onClick={onBackward}>
            Back to AI Review
          </Button>
          <Button
            variant="contained"
            color="success"
            endIcon={<ArrowRight size={16} />}
          >
            Submit for Planning
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ConfirmationScreen;
