import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
  Stack,
} from "@mui/material";

import {
  Upload as UploadIcon,
  FileText as FileTextIcon,
  Film as FilmIcon,
  File as FileIcon,
  X as XIcon,
  Clock as ClockIcon,
  Search as SearchIcon,
  Grid as GridIcon,
  List as ListIcon,
  Plus as PlusIcon,
  Image as ImageIcon,
  ArrowRight as ArrowRightIcon,
  AlertCircle as AlertCircleIcon,
} from "lucide-react";

const AssetAttachmentUploadPanel: React.FC<{
  onNext: () => void;
  onBackward: () => void;
}> = ({ onNext, onBackward }) => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "brand_guidelines_2025.pdf",
      type: "pdf",
      size: "3.2 MB",
      progress: 100,
      metadata: {
        assetType: "Guidelines",
        useCase: "Reference",
        teamOwner: "Brand",
      },
      tags: ["branding", "guidelines", "2025"],
    },
    {
      id: 2,
      name: "campaign_hero_image.jpg",
      type: "image",
      size: "1.8 MB",
      progress: 100,
      metadata: {
        assetType: "Image",
        useCase: "Hero",
        teamOwner: "Creative",
      },
      tags: ["hero", "product-x"],
    },
    {
      id: 3,
      name: "product_demo.mp4",
      type: "video",
      size: "12.5 MB",
      progress: 75,
      metadata: {
        assetType: "",
        useCase: "",
        teamOwner: "",
      },
      tags: [],
    },
  ]);

  const [selectedFile, setSelectedFile] = useState<{
    id: number;
    name: string;
    type: string;
    size: string;
    progress: number;
    metadata: {
      assetType?: string;
      useCase?: string;
      teamOwner?: string;
    };
    tags: string[];
  } | null>(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showPastAssets, setShowPastAssets] = useState(false);
  const [newTag, setNewTag] = useState("");

  const assetTypeOptions = [
    "Guidelines",
    "Image",
    "Video",
    "Copy",
    "Template",
    "Research",
    "Other",
  ];

  const useCaseOptions = [
    "Reference",
    "Hero",
    "Background",
    "Thumbnail",
    "Social",
    "Email",
    "Banner",
    "Other",
  ];

  const teamOptions = [
    "Marketing",
    "Creative",
    "Brand",
    "Product",
    "Sales",
    "Other",
  ];

  const suggestedTags = [
    "spring-2025",
    "product-x",
    "product-y",
    "service-z",
    "promotion",
    "guidelines",
    "hero",
    "lifestyle",
    "technical",
    "testimonial",
  ];

  const pastAssets = [
    {
      id: 101,
      name: "previous_campaign_assets.zip",
      type: "zip",
      size: "45.2 MB",
      lastUsed: "2 months ago",
      tags: ["campaign", "q4-2024"],
    },
    {
      id: 102,
      name: "product_photos_2024.jpg",
      type: "image",
      size: "2.3 MB",
      lastUsed: "3 months ago",
      tags: ["product-x", "lifestyle"],
    },
    {
      id: 103,
      name: "social_media_templates.ai",
      type: "design",
      size: "8.7 MB",
      lastUsed: "1 month ago",
      tags: ["social", "templates"],
    },
    {
      id: 104,
      name: "customer_testimonial.mp4",
      type: "video",
      size: "18.4 MB",
      lastUsed: "5 months ago",
      tags: ["testimonial", "customer"],
    },
  ];

  const handleFileSelect = (
    file: {
      id: number;
      name: string;
      type: string;
      size: string;
      progress: number;
      metadata: {
        assetType?: string;
        useCase?: string;
        teamOwner?: string;
      };
      tags: string[];
    } | null
  ) => {
    setSelectedFile(file?.id === selectedFile?.id ? null : file);
  };

  const removeFile = (fileId: number | undefined) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return (
          <Box sx={{ width: 24, height: 24, color: "primary.main" }}>
            <ImageIcon width="100%" height="100%" />
          </Box>
        );
      case "pdf":
        return (
          <FileTextIcon
            style={{ width: 24, height: 24, color: "var(--mui-error-main)" }}
          />
        );
      case "video":
        return (
          <FilmIcon
            style={{
              width: 24,
              height: 24,
              color: "var(--mui-secondary-main)",
            }}
          />
        );
      case "zip":
        return (
          <FileIcon
            style={{ width: 24, height: 24, color: "var(--mui-warning-main)" }}
          />
        );
      case "design":
        return (
          <FileIcon
            style={{ width: 24, height: 24, color: "var(--mui-success-main)" }}
          />
        );
      default:
        return (
          <FileIcon
            style={{
              width: 24,
              height: 24,
              color: "var(--mui-text-secondary)",
            }}
          />
        );
    }
  };

  const handleTagToggle = (tag: string) => {
    if (!selectedFile) return;

    setUploadedFiles(
      uploadedFiles.map((file) => {
        if (file.id === selectedFile.id) {
          const updatedTags = [...file.tags];
          const tagIndex = updatedTags.indexOf(tag);

          if (tagIndex > -1) {
            updatedTags.splice(tagIndex, 1);
          } else {
            updatedTags.push(tag);
          }

          return { ...file, tags: updatedTags };
        }
        return file;
      })
    );
  };

  const addNewTag = () => {
    if (!newTag.trim() || !selectedFile) return;

    setUploadedFiles(
      uploadedFiles.map((file) => {
        if (file.id === selectedFile.id) {
          const updatedTags = [...file.tags];
          if (!updatedTags.includes(newTag.trim())) {
            updatedTags.push(newTag.trim());
          }
          return { ...file, tags: updatedTags };
        }
        return file;
      })
    );

    setNewTag("");
  };

  const updateMetadata = (field: string, value: string) => {
    if (!selectedFile) return;

    setUploadedFiles(
      uploadedFiles.map((file) => {
        if (file.id === selectedFile.id) {
          return {
            ...file,
            metadata: {
              ...file.metadata,
              [field]: value,
            },
          };
        }
        return file;
      })
    );
  };

  const handleViewModeChange = (
    event: any,
    newValue: React.SetStateAction<string> | null
  ) => {
    if (newValue !== null) {
      setViewMode(newValue);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={3}>
        Asset & Attachment Upload
      </Typography>

      {/* Drag & Drop Upload Section */}
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          mb: 3,
          textAlign: "center",
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <UploadIcon
          style={{
            width: 48,
            height: 48,
            color: "var(--mui-text-secondary)",
            margin: "0 auto",
            marginBottom: "1.5rem",
          }}
        />
        <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
          Drag & drop files here
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Or click to browse files from your computer
        </Typography>
        <Button variant="contained" color="primary" size="medium">
          Select Files
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1.5}
        >
          Supported formats: PDF, DOCX, JPG, PNG, GIF, MP4, AI, PSD, ZIP (Max:
          100MB)
        </Typography>
      </Paper>

      {/* File List & Metadata */}
      <Box mb={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Uploaded Files ({uploadedFiles.length})
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Paper elevation={0} sx={{ bgcolor: "action.hover", p: 0.5 }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                size="small"
              >
                <ToggleButton value="grid" aria-label="grid view">
                  <GridIcon style={{ width: 16, height: 16 }} />
                </ToggleButton>
                <ToggleButton value="list" aria-label="list view">
                  <ListIcon style={{ width: 16, height: 16 }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
            <TextField
              placeholder="Search files"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      style={{
                        width: 16,
                        height: 16,
                        color: "var(--mui-text-secondary)",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>

        {/* File Grid View */}
        {viewMode === "grid" ? (
          <Grid container spacing={2}>
            {uploadedFiles.map((file) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={file.id}>
                <Card
                  variant="outlined"
                  onClick={() => handleFileSelect(file)}
                  sx={{
                    cursor: "pointer",
                    border: selectedFile?.id === file.id ? 2 : 1,
                    borderColor:
                      selectedFile?.id === file.id ? "primary.main" : "divider",
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 96,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {getFileIcon(file.type)}

                    {file.progress < 100 && (
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={file.progress}
                        />
                      </Box>
                    )}
                  </CardMedia>
                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="medium"
                        color="text.primary"
                        noWrap
                        sx={{ maxWidth: "80%" }}
                      >
                        {file.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(file.id);
                        }}
                        sx={{
                          p: 0.5,
                          color: "text.secondary",
                          "&:hover": { color: "text.primary" },
                        }}
                      >
                        <XIcon width={14} height={14} />
                      </IconButton>
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      mt={0.5}
                      display="block"
                    >
                      {file.size}
                    </Typography>

                    {file.tags.length > 0 && (
                      <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        sx={{ mt: 1 }}
                      >
                        {file.tags.slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.625rem",
                              bgcolor: "action.hover",
                              color: "text.secondary",
                              mb: 0.5,
                            }}
                          />
                        ))}
                        {file.tags.length > 2 && (
                          <Chip
                            label={`+${file.tags.length - 2}`}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.625rem",
                              bgcolor: "action.hover",
                              color: "text.secondary",
                            }}
                          />
                        )}
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack spacing={1}>
            {uploadedFiles.map((file) => (
              <Card
                key={file.id}
                variant="outlined"
                onClick={() => handleFileSelect(file)}
                sx={{
                  cursor: "pointer",
                  bgcolor:
                    selectedFile?.id === file.id
                      ? "primary.lightest"
                      : "background.paper",
                  borderColor:
                    selectedFile?.id === file.id ? "primary.light" : "divider",
                  "&:hover": {
                    bgcolor:
                      selectedFile?.id === file.id
                        ? "primary.lightest"
                        : "action.hover",
                  },
                }}
              >
                <Box sx={{ display: "flex", p: 1.5, alignItems: "center" }}>
                  <Box sx={{ mr: 1.5 }}>{getFileIcon(file.type)}</Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="text.primary"
                      noWrap
                    >
                      {file.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {file.size}
                      </Typography>
                      {file.metadata.assetType && (
                        <>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mx: 0.5 }}
                          >
                            •
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.metadata.assetType}
                          </Typography>
                        </>
                      )}
                      {file.tags.length > 0 && (
                        <>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mx: 0.5 }}
                          >
                            •
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {file.tags.length} tags
                          </Typography>
                        </>
                      )}
                    </Box>

                    {file.progress < 100 && (
                      <Box sx={{ mt: 1, width: "100%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={file.progress}
                        />
                      </Box>
                    )}
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    sx={{ ml: 1, color: "text.secondary" }}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            ))}
          </Stack>
        )}

        {/* Empty state for more files */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mt: 2,
            textAlign: "center",
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Drag & drop more files here or click upload
          </Typography>
        </Paper>
      </Box>

      {/* Metadata Panel */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
          File Details & Metadata
        </Typography>

        <Box
          sx={{
            opacity: selectedFile ? 1 : 0.5,
            pointerEvents: selectedFile ? "auto" : "none",
          }}
        >
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="asset-type-label">Asset Type</InputLabel>
                <Select
                  labelId="asset-type-label"
                  value={selectedFile?.metadata?.assetType || ""}
                  onChange={(e) => updateMetadata("assetType", e.target.value)}
                  label="Asset Type"
                >
                  <MenuItem value="">Select type</MenuItem>
                  {assetTypeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="use-case-label">Use Case</InputLabel>
                <Select
                  labelId="use-case-label"
                  value={selectedFile?.metadata?.useCase || ""}
                  onChange={(e) => updateMetadata("useCase", e.target.value)}
                  label="Use Case"
                >
                  <MenuItem value="">Select use case</MenuItem>
                  {useCaseOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="team-owner-label">Team Owner</InputLabel>
                <Select
                  labelId="team-owner-label"
                  value={selectedFile?.metadata?.teamOwner || ""}
                  onChange={(e) => updateMetadata("teamOwner", e.target.value)}
                  label="Team Owner"
                >
                  <MenuItem value="">Select team</MenuItem>
                  {teamOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box mb={2}>
            <Typography variant="subtitle2" color="text.secondary" mb={0.5}>
              Tags
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
                ml={0.5}
              >
                (helps with search and organization)
              </Typography>
            </Typography>

            <Alert
              severity="info"
              icon={<AlertCircleIcon fontSize="inherit" />}
              sx={{ mb: 1.5, "& .MuiAlert-message": { fontSize: "0.75rem" } }}
            >
              AI Suggestion: Try adding tags like "Q2-2025" and "brand-refresh"
              based on your campaign details.
            </Alert>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
              {selectedFile?.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  onDelete={() => handleTagToggle(tag)}
                  deleteIcon={
                    <XIcon fontSize="small" style={{ width: 14, height: 14 }} />
                  }
                  sx={{
                    height: 24,
                    bgcolor: "primary.lightest",
                    color: "primary.dark",
                  }}
                />
              ))}
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  addNewTag();
                }}
              >
                <TextField
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          type="submit"
                          size="small"
                          sx={{ bgcolor: "action.hover" }}
                        >
                          <PlusIcon fontSize="small" width={14} height={14} />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      height: 24,
                      fontSize: "0.75rem",
                      borderRadius: 12,
                      px: 1,
                    },
                  }}
                  sx={{ width: 120 }}
                />
              </Box>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontSize="0.75rem"
                mb={0.5}
              >
                Suggested Tags:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {suggestedTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    onClick={() => handleTagToggle(tag)}
                    sx={{
                      height: 24,
                      bgcolor: selectedFile?.tags.includes(tag)
                        ? "primary.lightest"
                        : "action.hover",
                      color: selectedFile?.tags.includes(tag)
                        ? "primary.dark"
                        : "text.secondary",
                      "&:hover": {
                        bgcolor: selectedFile?.tags.includes(tag)
                          ? "primary.lightest"
                          : "action.selected",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Past Assets Section */}
      <Box mb={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            Use Past Assets
          </Typography>
          <Button
            color="primary"
            onClick={() => setShowPastAssets(!showPastAssets)}
            sx={{ textTransform: "none" }}
          >
            {showPastAssets ? "Hide" : "Browse Digital Asset Manager"}
          </Button>
        </Box>

        {showPastAssets && (
          <Paper variant="outlined" sx={{ borderRadius: 1 }}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: "action.hover",
                borderBottom: 1,
                borderBottomColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Search asset manager"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{
                          width: 16,
                          height: 16,
                          color: "var(--mui-text-secondary)",
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 250 }}
              />
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value="all" displayEmpty>
                    <MenuItem value="all">All file types</MenuItem>
                    <MenuItem value="images">Images</MenuItem>
                    <MenuItem value="videos">Videos</MenuItem>
                    <MenuItem value="documents">Documents</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <Select value="all" displayEmpty>
                    <MenuItem value="all">All campaigns</MenuItem>
                    <MenuItem value="winter">Winter 2024</MenuItem>
                    <MenuItem value="fall">Fall 2024</MenuItem>
                    <MenuItem value="summer">Summer 2024</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ p: 2 }}>
              <Grid container spacing={1.5}>
                {pastAssets.map((asset) => (
                  <Grid item xs={12} sm={6} md={3} key={asset.id}>
                    <Card variant="outlined" sx={{ height: "100%" }}>
                      <CardMedia
                        sx={{
                          height: 80,
                          bgcolor: "action.hover",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getFileIcon(asset.type)}
                      </CardMedia>
                      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color="text.primary"
                          noWrap
                        >
                          {asset.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="caption" color="text.secondary">
                            {asset.size}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ClockIcon
                              style={{
                                width: 12,
                                height: 12,
                                marginRight: 4,
                                color: "var(--mui-text-secondary)",
                              }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {asset.lastUsed}
                            </Typography>
                          </Box>
                        </Box>

                        {asset.tags.length > 0 && (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                              mt: 1,
                            }}
                          >
                            {asset.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: "0.625rem",
                                  bgcolor: "action.hover",
                                  color: "text.secondary",
                                }}
                              />
                            ))}
                          </Box>
                        )}

                        <Button
                          fullWidth
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            mt: 1,
                            textTransform: "none",
                            py: 0.5,
                            fontSize: "0.75rem",
                          }}
                        >
                          Use Asset
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Button color="primary" sx={{ textTransform: "none" }}>
                  Load more assets
                </Button>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={onBackward}
        >
          Back to Brief
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon size={16} />}
          onClick={onNext}
        >
          Next: Tool Sync
        </Button>
      </Box>
    </Paper>
  );
};

export default AssetAttachmentUploadPanel;
