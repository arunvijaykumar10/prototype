import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Stack,
  AppBar,
  Toolbar,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  Search,
  RefreshCw,
  PlugZap,
  X,
  Beaker,
  ChevronRight,
} from "lucide-react";
import AddIntegrationModal from "./NewIntegration";

// Mock data for integrations
const integrationData = [
  {
    id: "salesforce",
    name: "Salesforce",
    type: "CRM",
    status: "connected",
    connectedAs: "marketing@example.com",
    lastSync: "10 mins ago",
    latency: "120",
    throughput: "3,200 contacts synced this hour",
    errors: "0 errors",
    dashboard: {
      campaigns: 12,
      description:
        "Successfully launched 12 campaigns last month with a 15% increase in engagement.",
    },
    logs: [
      {
        timestamp: "10:22 AM",
        type: "Pull",
        action: "Contacts from Salesforce",
        volume: "2,137",
        status: "Success",
      },
      {
        timestamp: "09:15 AM",
        type: "Push",
        action: "Updated Leads to Salesforce",
        volume: "532",
        status: "Success",
      },
      {
        timestamp: "08:30 AM",
        type: "Pull",
        action: "Opportunities from Salesforce",
        volume: "48",
        status: "Success",
      },
    ],
    settings: {
      syncDirection: "bi-directional",
      conflictResolution: "last_updated",
      alerts: { syncLatency: true, authExpiration: true, dataError: true },
    },
  },
  {
    id: "segment",
    name: "Segment",
    type: "CDP",
    status: "needs_refresh",
    connectedAs: "data@example.com",
    lastSync: "1 day ago",
    latency: "350",
    throughput: "15,400 events processed today",
    errors: "3 segments failed to pull due to schema mismatch",
    dashboard: {
      campaigns: 8,
      description:
        "Data flowing to 8 downstream systems with 99.2% delivery rate.",
    },
    logs: [
      {
        timestamp: "10:25 AM",
        type: "Push",
        action: "Events to Segment",
        volume: "1,246",
        status: "Success",
      },
      {
        timestamp: "10:20 AM",
        type: "Pull",
        action: "Audiences from Segment",
        volume: "12",
        status: "Failed",
      },
    ],
    settings: {
      syncDirection: "one-way",
      conflictResolution: "source_of_truth",
      alerts: { syncLatency: true, authExpiration: false, dataError: true },
    },
  },
  {
    id: "adobe-dam",
    name: "Adobe DAM",
    type: "DAM",
    status: "disconnected",
    connectedAs: "assets@example.com",
    lastSync: "3 days ago",
    latency: "500",
    throughput: "No recent activity",
    errors: "Authentication token expired",
    dashboard: {
      campaigns: 4,
      description:
        "Last successful asset sync was 3 days ago. Authentication needed.",
    },
    logs: [
      {
        timestamp: "10:25 AM",
        type: "Push",
        action: "Variants to Adobe DAM",
        volume: "12 files",
        status: "Failed",
      },
      {
        timestamp: "08:12 AM",
        type: "Pull",
        action: "Assets from Adobe DAM",
        volume: "0",
        status: "Failed",
      },
    ],
    settings: {
      syncDirection: "bi-directional",
      conflictResolution: "last_updated",
      alerts: { syncLatency: false, authExpiration: true, dataError: true },
    },
  },
  {
    id: "meta",
    name: "Meta Ads",
    type: "AdPlatform",
    status: "connected",
    connectedAs: "ads@example.com",
    lastSync: "30 mins ago",
    latency: "95",
    throughput: "5 campaigns synced this hour",
    errors: "0 errors",
    dashboard: {
      campaigns: 15,
      description:
        "Running 15 active campaigns with 3.2M impressions in the last 30 days.",
    },
    logs: [
      {
        timestamp: "10:30 AM",
        type: "Push",
        action: "Campaign updates to Meta",
        volume: "2 campaigns",
        status: "Success",
      },
      {
        timestamp: "09:45 AM",
        type: "Pull",
        action: "Ad performance from Meta",
        volume: "15 reports",
        status: "Success",
      },
    ],
    settings: {
      syncDirection: "bi-directional",
      conflictResolution: "source_of_truth",
      alerts: { syncLatency: true, authExpiration: true, dataError: true },
    },
  },
  {
    id: "workfront",
    name: "Workfront",
    type: "CMP",
    status: "connected",
    connectedAs: "projects@example.com",
    lastSync: "15 mins ago",
    latency: "110",
    throughput: "23 tasks updated this hour",
    errors: "0 errors",
    dashboard: {
      campaigns: 7,
      description:
        "Managing 7 project workflows with 85% on-time delivery rate.",
    },
    logs: [
      {
        timestamp: "10:15 AM",
        type: "Pull",
        action: "Project status from Workfront",
        volume: "7 projects",
        status: "Success",
      },
      {
        timestamp: "09:30 AM",
        type: "Push",
        action: "Task updates to Workfront",
        volume: "23 tasks",
        status: "Success",
      },
    ],
    settings: {
      syncDirection: "one-way",
      conflictResolution: "last_updated",
      alerts: { syncLatency: false, authExpiration: true, dataError: false },
    },
  },
];

// Integration Directory Component
interface Integration {
  id: string;
  name: string;
  type: string;
  status: string;
  lastSync: string;
}

const IntegrationDirectory = ({
  integrations,
  selectedIntegration,
  onSelectIntegration,
}: {
  integrations: Integration[];
  selectedIntegration: Integration | null;
  onSelectIntegration: (integration: Integration) => void;
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Box component="span" title="Connected" sx={{ fontSize: "1.25rem" }}>
            🟢
          </Box>
        );
      case "needs_refresh":
        return (
          <Box
            component="span"
            title="Needs Refresh"
            sx={{ fontSize: "1.25rem" }}
          >
            🟡
          </Box>
        );
      case "disconnected":
        return (
          <Box
            component="span"
            title="Disconnected"
            sx={{ fontSize: "1.25rem" }}
          >
            🔴
          </Box>
        );
      default:
        return (
          <Box component="span" sx={{ fontSize: "1.25rem" }}>
            ⚪
          </Box>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "CMP":
        return "📄";
      case "CDP":
        return "🧠";
      case "CRM":
        return "🎯";
      case "CMS":
        return "🌐";
      case "DAM":
        return "🎨";
      case "AdPlatform":
        return "📢";
      default:
        return "🔧";
    }
  };

  return (
    <Stack spacing={2}>
      {integrations.map((integration: Integration) => (
        <Card
          key={integration.id}
          variant="outlined"
          sx={{
            cursor: "pointer",
            bgcolor:
              selectedIntegration?.id === integration.id
                ? "primary.lightest"
                : "background.paper",
            borderColor:
              selectedIntegration?.id === integration.id
                ? "primary.light"
                : "divider",
            "&:hover": {
              bgcolor:
                selectedIntegration?.id === integration.id
                  ? "primary.lightest"
                  : "action.hover",
            },
          }}
          onClick={() => onSelectIntegration(integration)}
        >
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={`/api/placeholder/32/32?text=${
                  typeof integration.name === "string"
                    ? integration.name.charAt(0)
                    : ""
                }`}
                variant="rounded"
                sx={{
                  mr: 1.5,
                  width: 40,
                  height: 40,
                  bgcolor: "action.hover",
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {integration.name}
                  </Typography>
                  <Box>{getStatusIcon(integration.status)}</Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <Chip
                    label={`${getTypeIcon(integration.type)} ${
                      integration.type
                    }`}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.7rem",
                      bgcolor: "action.hover",
                      color: "text.secondary",
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    {integration.lastSync}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

      {integrations.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
          <Typography>
            No integrations found. Try a different search or category.
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

// Integration Details Component
interface Integration {
  id: string;
  name: string;
  type: string;
  status: string;
  connectedAs: string;
  lastSync: string;
  latency: string;
  throughput: string;
  errors: string;
  dashboard: {
    campaigns: number;
    description: string;
  };
  logs: Array<{
    timestamp: string;
    type: string;
    action: string;
    volume: string;
    status: string;
  }>;
  settings: {
    syncDirection: string;
    conflictResolution: string;
    alerts: {
      syncLatency: boolean;
      authExpiration: boolean;
      dataError: boolean;
    };
  };
}

const IntegrationDetails = ({ integration }: { integration: Integration }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleChangeTab = (
    _event: React.SyntheticEvent,
    newValue: React.SetStateAction<string>
  ) => {
    setActiveTab(newValue);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Chip
            label="🟢 Active"
            color="success"
            size="small"
            sx={{ fontWeight: "medium" }}
          />
        );
      case "needs_refresh":
        return (
          <Chip
            label="🟡 Needs Refresh"
            color="warning"
            size="small"
            sx={{ fontWeight: "medium" }}
          />
        );
      case "disconnected":
        return (
          <Chip
            label="🔴 Disconnected"
            color="error"
            size="small"
            sx={{ fontWeight: "medium" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Tool Header */}
      <Paper
        elevation={0}
        sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={`/api/placeholder/48/48?text=${integration.name.charAt(0)}`}
              alt={integration.name}
              variant="rounded"
              sx={{
                mr: 2,
                width: 48,
                height: 48,
                bgcolor: "action.hover",
              }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {integration.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Chip
                  label={integration.type}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.7rem",
                    bgcolor: "action.hover",
                    color: "text.secondary",
                    mr: 1.5,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  Connected as: {integration.connectedAs}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>{getStatusBadge(integration.status)}</Box>
        </Box>
      </Paper>

      {/* Tab Navigation */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleChangeTab}
            aria-label="integration tabs"
            sx={{ px: 3 }}
          >
            <Tab label="Overview" value="overview" />
            <Tab label="Sync Logs" value="sync-logs" />
            <Tab label="Settings & Rules" value="settings" />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "auto", px: 3, py: 2 }}>
          {activeTab === "overview" && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Connection Health
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Last Sync
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {integration.lastSync}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Latency
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {integration.latency} ms
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Data Throughput
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {integration.throughput}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Errors/Issues
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                        color="error.main"
                      >
                        {integration.errors || "None"}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Mini Dashboard
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="semibold" gutterBottom>
                    {integration.dashboard?.campaigns || "0"} campaigns launched
                    via this tool last month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {integration.dashboard?.description ||
                      "No additional data available"}
                  </Typography>
                </Paper>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<RefreshCw size={16} />}
                  sx={{ textTransform: "none" }}
                >
                  Refresh Sync
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PlugZap size={16} />}
                  sx={{ textTransform: "none" }}
                >
                  Re-authenticate
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  startIcon={<Beaker size={16} />}
                  sx={{ textTransform: "none" }}
                >
                  Test Connection
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<X size={16} />}
                  sx={{ textTransform: "none" }}
                >
                  Disconnect
                </Button>
              </Stack>
            </Box>
          )}

          {activeTab === "sync-logs" && (
            <Box>
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Data Sync Log Viewer</Typography>
                <Button
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Export Logs
                </Button>
              </Box>

              <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 650 }} size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "action.hover" }}>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Volume</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {integration.logs?.map(
                      (
                        log: {
                          timestamp:
                            | string
                            | number
                            | bigint
                            | boolean
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          type:
                            | string
                            | number
                            | bigint
                            | boolean
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          action:
                            | string
                            | number
                            | bigint
                            | boolean
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          volume:
                            | string
                            | number
                            | bigint
                            | boolean
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                          status: string;
                        },
                        index: React.Key | null | undefined
                      ) => (
                        <TableRow key={index}>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>{log.type}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.volume}</TableCell>
                          <TableCell>
                            {log.status === "Success" ? (
                              <Typography variant="body2" color="success.main">
                                ✅ Success
                              </Typography>
                            ) : (
                              <Typography variant="body2" color="error.main">
                                ❌ Failed
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {activeTab === "settings" && (
            <Box>
              <Stack spacing={3}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Sync Direction
                  </Typography>
                  <RadioGroup
                    defaultValue={integration.settings?.syncDirection}
                    name="syncDirection"
                    row
                  >
                    <FormControlLabel
                      value="one-way"
                      control={<Radio size="small" />}
                      label="One-way"
                    />
                    <FormControlLabel
                      value="bi-directional"
                      control={<Radio size="small" />}
                      label="Bi-directional"
                    />
                  </RadioGroup>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Mapping Settings
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="Segment audience ID"
                          defaultValue="segment_audience_id"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={2} sx={{ textAlign: "center" }}>
                        <ChevronRight color="action.active" />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="Internal Segment Code"
                          defaultValue="internal_segment_code"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    color="primary"
                    size="small"
                    sx={{ textTransform: "none" }}
                  >
                    + Add New Mapping
                  </Button>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Sync Conflict Resolution
                  </Typography>
                  <RadioGroup
                    defaultValue={integration.settings?.conflictResolution}
                    name="conflictResolution"
                  >
                    <FormControlLabel
                      value="last_updated"
                      control={<Radio size="small" />}
                      label="Prefer last updated"
                    />
                    <FormControlLabel
                      value="source_of_truth"
                      control={<Radio size="small" />}
                      label="Prefer source of truth"
                    />
                  </RadioGroup>
                </Paper>

                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Alerts Setup
                  </Typography>
                  <FormControl component="fieldset">
                    <Stack spacing={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            defaultChecked={
                              integration.settings?.alerts?.syncLatency
                            }
                          />
                        }
                        label="Notify me if sync latency exceeds 5 mins"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            defaultChecked={
                              integration.settings?.alerts?.authExpiration
                            }
                          />
                        }
                        label="Notify me 3 days before authentication expires"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            size="small"
                            defaultChecked={
                              integration.settings?.alerts?.dataError
                            }
                          />
                        }
                        label="Notify me if data sync errors occur"
                      />
                    </Stack>
                  </FormControl>
                </Paper>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}
                >
                  <Button variant="outlined" color="inherit">
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary">
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Main App Component
const MainLayout = () => {
  const [selectedIntegration, setSelectedIntegration] = useState(
    integrationData[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Handle category filter change
  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: React.SetStateAction<string> | null
  ) => {
    if (newValue !== null) {
      setActiveTab(newValue);
    }
  };

  // Filter integrations based on search and active tab
  const filteredIntegrations = integrationData.filter((integration) => {
    const matchesSearch = integration.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || integration.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            Integration Settings
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<span>➕</span>}
            onClick={() => setShowAddModal(true)}
            sx={{ textTransform: "none" }}
          >
            Add New Integration
          </Button>
          <AddIntegrationModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Left Column: Integration Directory */}
        <Box
          sx={{
            width: "33%",
            borderRight: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search integrations..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <ToggleButtonGroup
              value={activeTab}
              exclusive
              onChange={handleCategoryChange}
              aria-label="integration categories"
              size="small"
              sx={{
                mb: 2,
                display: "flex",
                flexWrap: "wrap",
                "& .MuiToggleButtonGroup-grouped": {
                  mx: 0.2,
                  my: 0.5,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                },
              }}
            >
              <ToggleButton value="all" aria-label="all integrations">
                All
              </ToggleButton>
              <ToggleButton value="CMP" aria-label="CMP integrations">
                📄 CMP
              </ToggleButton>
              <ToggleButton value="CDP" aria-label="CDP integrations">
                🧠 CDP
              </ToggleButton>
              <ToggleButton value="CRM" aria-label="CRM integrations">
                🎯 CRM
              </ToggleButton>
              <ToggleButton value="CMS" aria-label="CMS integrations">
                🌐 CMS
              </ToggleButton>
              <ToggleButton value="DAM" aria-label="DAM integrations">
                🎨 DAM
              </ToggleButton>
              <ToggleButton
                value="AdPlatform"
                aria-label="Ad platform integrations"
              >
                📢 Ad Platforms
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box sx={{ flexGrow: 1, overflow: "auto", px: 2, pb: 2 }}>
            <IntegrationDirectory
              integrations={filteredIntegrations}
              selectedIntegration={selectedIntegration}
              onSelectIntegration={setSelectedIntegration}
            />
          </Box>
        </Box>

        {/* Right Column: Integration Details */}
        <Box sx={{ width: "67%", overflow: "hidden" }}>
          {selectedIntegration && (
            <IntegrationDetails integration={selectedIntegration} />
          )}
        </Box>
      </Box>

      {/* AI Health Summary Bar - Fixed at bottom */}
      <Alert
        severity="info"
        icon={<span>✨</span>}
        sx={{
          borderRadius: 0,
          py: 0.75,
        }}
        action={
          <Button
            color="inherit"
            size="small"
            sx={{ textTransform: "none", fontWeight: "medium" }}
          >
            Refresh All Connections
          </Button>
        }
      >
        Last sync stable. 2 integrations need auth refresh.
      </Alert>
    </Box>
  );
};

export default MainLayout;
