import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Alert,
  AlertTitle,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  ChevronDown,
  Database,
  Link,
  RefreshCw,
  AlertCircle,
  Check,
  ArrowRight,
} from "lucide-react";

interface AutoSyncPanelProps {
  onNext: () => void;
  onBackward: () => void;
}

const AutoSyncPanel: React.FC<AutoSyncPanelProps> = ({
  onNext,
  onBackward,
}) => {
  const [selectedCMP, setSelectedCMP] = useState("");
  const [selectedCRM, setSelectedCRM] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle', 'syncing', 'completed', 'error'
  const [importedData, setImportedData] = useState([
    {
      field: "Campaign Name",
      value: "Q2 Product Launch",
      synced: true,
      overridden: false,
    },
    {
      field: "Target Audience",
      value: "Enterprise Customers",
      synced: true,
      overridden: false,
    },
    {
      field: "Start Date",
      value: "2025-06-01",
      synced: true,
      overridden: false,
    },
    { field: "Budget", value: "", synced: false, overridden: false },
    { field: "Campaign Goals", value: "", synced: false, overridden: false },
  ]);

  const handleConnect = () => {
    if (!selectedCMP || !selectedCRM) return;

    setSyncStatus("syncing");

    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setSyncStatus("completed");
    }, 1500);
  };

  const handleSync = () => {
    if (!isConnected) return;

    setSyncStatus("syncing");

    // Simulate sync delay
    setTimeout(() => {
      setSyncStatus("completed");
    }, 2000);
  };

  const handleOverride = (index: number) => {
    const newData = [...importedData];
    newData[index].overridden = !newData[index].overridden;
    setImportedData(newData);
  };

  const handleValueChange = (index: number, newValue: string) => {
    const newData = [...importedData];
    newData[index].value = newValue;
    setImportedData(newData);
  };

  const filledFieldsCount = importedData.filter((item) => item.value).length;
  const totalFieldsCount = importedData.length;

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={3}>
        Auto-Sync from Tools
      </Typography>

      {/* Connection Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <FormControl sx={{ width: 240 }}>
          <InputLabel id="cmp-label">Import from CMP</InputLabel>
          <Select
            labelId="cmp-label"
            value={selectedCMP}
            label="Import from CMP"
            onChange={(e) => setSelectedCMP(e.target.value)}
            IconComponent={() => (
              <ChevronDown size={16} style={{ marginRight: 8 }} />
            )}
          >
            <MenuItem value="">Select CMP...</MenuItem>
            <MenuItem value="airtable">Airtable</MenuItem>
            <MenuItem value="workfront">Workfront</MenuItem>
            <MenuItem value="marketo">Marketo Engage</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: 240 }}>
          <InputLabel id="crm-label">Connect CRM/CDP</InputLabel>
          <Select
            labelId="crm-label"
            value={selectedCRM}
            label="Connect CRM/CDP"
            onChange={(e) => setSelectedCRM(e.target.value)}
            IconComponent={() => (
              <ChevronDown size={16} style={{ marginRight: 8 }} />
            )}
          >
            <MenuItem value="">Select CRM/CDP...</MenuItem>
            <MenuItem value="salesforce">Salesforce</MenuItem>
            <MenuItem value="segment">Segment</MenuItem>
            <MenuItem value="adobe">Adobe CDP</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            variant="contained"
            color={isConnected ? "success" : "primary"}
            onClick={handleConnect}
            disabled={!selectedCMP || !selectedCRM}
            startIcon={isConnected ? <Check size={18} /> : <Link size={18} />}
            sx={{ height: 40 }}
          >
            {isConnected ? "Connected" : "Connect Systems"}
          </Button>
        </Box>

        {isConnected && (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              variant="contained"
              color={syncStatus === "syncing" ? "warning" : "primary"}
              onClick={handleSync}
              disabled={syncStatus === "syncing"}
              startIcon={
                syncStatus === "syncing" ? (
                  <RefreshCw size={18} className="animate-spin" />
                ) : (
                  <RefreshCw size={18} />
                )
              }
              sx={{ height: 40 }}
            >
              {syncStatus === "syncing" ? "Syncing..." : "Sync Now"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Connection Status */}
      <Paper
        variant="outlined"
        sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}
      >
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Connection Status
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                mr: 1,
                bgcolor: isConnected ? "success.main" : "action.disabled",
              }}
            />
            <Typography variant="body2">
              CMP: {selectedCMP || "Not selected"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                mr: 1,
                bgcolor: isConnected ? "success.main" : "action.disabled",
              }}
            />
            <Typography variant="body2">
              CRM/CDP: {selectedCRM || "Not selected"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                mr: 1,
                bgcolor:
                  syncStatus === "completed"
                    ? "success.main"
                    : syncStatus === "syncing"
                    ? "warning.main"
                    : syncStatus === "error"
                    ? "error.main"
                    : "action.disabled",
              }}
            />
            <Typography variant="body2">
              Last Sync:{" "}
              {syncStatus === "completed"
                ? "Completed successfully"
                : syncStatus === "syncing"
                ? "In progress..."
                : syncStatus === "error"
                ? "Failed - retry"
                : "Not synced yet"}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Imported Data */}
      <Box mb={3}>
        <Typography variant="h6" mb={1.5}>
          Imported Campaign Data
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: "action.hover" }}>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importedData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: item.overridden
                      ? "primary.lightest"
                      : "background.paper",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="medium">
                      {item.field}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.overridden ? (
                      <TextField
                        size="small"
                        fullWidth
                        value={item.value}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {item.value || (
                          <Box
                            component="span"
                            sx={{ fontStyle: "italic", color: "text.disabled" }}
                          >
                            No data
                          </Box>
                        )}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.synced ? (
                      <Chip
                        label="Synced"
                        size="small"
                        color="success"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    ) : (
                      <Chip
                        label="Missing"
                        size="small"
                        color="warning"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      color={item.overridden ? "inherit" : "primary"}
                      onClick={() => handleOverride(index)}
                      sx={{ textTransform: "none", py: 0.5 }}
                    >
                      {item.overridden ? "Reset" : "Override"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* AI Validation */}
      <Alert severity="warning" icon={<AlertCircle size={20} />} sx={{ mb: 3 }}>
        <AlertTitle sx={{ fontSize: "0.875rem" }}>
          {filledFieldsCount} of {totalFieldsCount} brief fields filled
        </AlertTitle>
        <Typography variant="body2" color="text.secondary" mb={1.5}>
          Some required fields are missing. You can continue with partial data
          or complete missing fields.
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Continue Anyway
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Fill Missing Data
          </Button>
        </Box>
      </Alert>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onBackward}
          startIcon={<ArrowRight size={16} />}
          sx={{ textTransform: "none" }}
        >
          Back to Assets
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowRight size={16} />}
          onClick={onNext}
        >
          Next: AI Review
        </Button>
      </Box>
    </Paper>
  );
};

export default AutoSyncPanel;
