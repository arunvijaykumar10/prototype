import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Collapse,
  Button,
  Divider,
  TextField,
  LinearProgress,
  Chip,
  Alert,
  Stack
} from '@mui/material';
import {
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface AIReviewSuggestionPanelProps {
  onNext: () => void;
  onBackward: () => void;
}

const AIReviewSuggestionPanel = ({ onNext ,onBackward}: AIReviewSuggestionPanelProps) => {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', message: "How can I help with your campaign brief?" }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [expandedFlags, setExpandedFlags] = useState(true);
  const [expandedSuggestions, setExpandedSuggestions] = useState(true);
  
  const flags = [
    { 
      id: 1, 
      title: "No target audience selected", 
      severity: "high", 
      description: "Your campaign requires a target audience for effective segmentation and personalization.",
      action: "Go to Target section to select audience segments" 
    },
    { 
      id: 2, 
      title: "No product linked to brief", 
      severity: "high", 
      description: "Link products to ensure proper tracking and analytics.",
      action: "Go to Ingest section to link products" 
    },
    { 
      id: 3, 
      title: "Launch date may conflict with holiday", 
      severity: "medium", 
      description: "Your selected launch date falls close to Memorial Day which may affect engagement.",
      action: "Review Plan section to adjust timing" 
    }
  ];

  const suggestions = [
    {
      id: 1,
      title: "Campaign Brief Summary",
      content: "Based on past data, we recommend positioning this as a solution-focused campaign rather than feature-focused. Performance data shows 32% higher engagement when emphasizing customer pain points.",
      confidence: 87
    },
    {
      id: 2,
      title: "Channel Recommendation",
      content: "Historical data shows your target audience responds best to email (42% CTR) and LinkedIn (3.8% engagement rate) for similar product launches.",
      confidence: 92
    }
  ];

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', message: userMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      if (userMessage.toLowerCase().includes('channel') || userMessage.toLowerCase().includes('lead-gen')) {
        response = "For lead generation campaigns, we typically see best results with LinkedIn Ads (3.2% conversion rate), followed by targeted webinars (2.7%) and content marketing with gated assets (2.1%). Based on your industry, I'd recommend prioritizing LinkedIn and webinars.";
      } else {
        response = "I understand your question. Based on your campaign objectives and past performance data, I'd recommend focusing on emphasizing customer pain points that your product solves rather than just listing features. This approach has shown 27% higher engagement in previous similar campaigns.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', message: response }]);
    }, 1000);
    
    setUserMessage('');
  };

  // Function to get severity color
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high':
        return { 
          bg: 'error.lightest', 
          border: 'error.main', 
          text: 'error.dark',
          chip: { bg: 'error.light', text: 'error.dark' }
        };
      case 'medium':
        return { 
          bg: 'warning.lightest', 
          border: 'warning.main', 
          text: 'warning.dark',
          chip: { bg: 'warning.light', text: 'warning.dark' }
        };
      default:
        return { 
          bg: 'info.lightest', 
          border: 'info.main', 
          text: 'info.dark',
          chip: { bg: 'info.light', text: 'info.dark' }
        };
    }
  };

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'primary.lightest', borderBottom: 1, borderColor: 'primary.light' }}>
        <Typography variant="h6" color="primary.dark" sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircle size={20} style={{ marginRight: 8, color: '#1976d2' }} />
          AI Review & Summary Suggestions
        </Typography>
        <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>
          AI has analyzed your brief and found issues to address before proceeding
        </Typography>
      </Box>
      
      {/* Flags Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer', 
            bgcolor: 'action.hover'
          }} 
          onClick={() => setExpandedFlags(!expandedFlags)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AlertTriangle size={18} style={{ marginRight: 8, color: '#f59e0b' }} />
            <Typography variant="subtitle1" fontWeight="medium">
              Issues Requiring Attention
            </Typography>
            <Chip 
              label={`${flags.filter(f => f.severity === "high").length} critical`}
              size="small"
              sx={{ 
                ml: 1, 
                bgcolor: 'warning.light', 
                color: 'white', 
                fontSize: '0.625rem',
                height: 20
              }}
            />
          </Box>
          {expandedFlags ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Box>
        
        <Collapse in={expandedFlags}>
          <Box sx={{ p: 2 }}>
            <Stack spacing={1.5}>
              {flags.map(flag => {
                const colorSet = getSeverityColor(flag.severity);
                return (
                  <Box 
                    key={flag.id} 
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 1, 
                      bgcolor: colorSet.bg,
                      borderLeft: 4, 
                      borderColor: colorSet.border
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle2">{flag.title}</Typography>
                      <Chip 
                        label={flag.severity === 'high' ? 'Critical' : 
                               flag.severity === 'medium' ? 'Warning' : 'Info'}
                        size="small"
                        sx={{ 
                          bgcolor: colorSet.chip.bg, 
                          color: 'white', 
                          fontSize: '0.625rem',
                          height: 20
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {flag.description}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        sx={{ textTransform: 'none' }}
                      >
                        {flag.action}
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Collapse>
      </Box>
      
      {/* Suggestions Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer', 
            bgcolor: 'action.hover'
          }} 
          onClick={() => setExpandedSuggestions(!expandedSuggestions)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle size={18} style={{ marginRight: 8, color: '#10b981' }} />
            <Typography variant="subtitle1" fontWeight="medium">
              AI Suggestions
            </Typography>
          </Box>
          {expandedSuggestions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Box>
        
        <Collapse in={expandedSuggestions}>
          <Box sx={{ p: 2 }}>
            <Stack spacing={2}>
              {suggestions.map(suggestion => (
                <Paper 
                  key={suggestion.id} 
                  variant="outlined"
                  sx={{ p: 2, bgcolor: 'success.lightest' }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="subtitle2">{suggestion.title}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                        Confidence:
                      </Typography>
                      <Box sx={{ width: 80, mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={suggestion.confidence}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: suggestion.confidence > 90 ? 'success.main' : 'primary.main',
                              borderRadius: 4
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="caption" fontWeight="medium">
                        {suggestion.confidence}%
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {suggestion.content}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Accept Suggestion
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Ignore
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      Edit Manually
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Box>
      
      {/* AI Brief Summary */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1.5 }}>
          AI-Generated Brief Summary
        </Typography>
        <Alert 
          severity="info" 
          variant="outlined"
          sx={{ 
            bgcolor: 'primary.lightest',
            borderColor: 'primary.light',
            '& .MuiAlert-message': { width: '100%' }
          }}
        >
          <Typography variant="body2" color="primary.dark">
            Based on your inputs, this appears to be a <strong>lead generation campaign</strong> for <strong>Product A</strong>, targeting <strong>enterprise customers</strong>. The campaign is scheduled to run from <strong>June 1 to July 15, 2025</strong>.
          </Typography>
          <Typography variant="body2" color="primary.dark" sx={{ mt: 1 }}>
            Your campaign needs more details about target audience demographics, budget allocations, and specific success metrics. Based on similar past campaigns, we recommend a budget of $15,000-$20,000 and defining specific lead quality metrics.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Accept Summary
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Edit Summary
            </Button>
          </Stack>
        </Alert>
      </Box>
      
      {/* AI Chat Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Button
            color="primary"
            startIcon={<MessageSquare size={16} />}
            endIcon={showChat ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            onClick={() => setShowChat(!showChat)}
            sx={{ textTransform: 'none' }}
          >
            {showChat ? 'Hide AI Assistant Chat' : 'Ask AI Assistant Questions'}
          </Button>
        </Box>
        
        <Collapse in={showChat}>
          <Paper variant="outlined" sx={{ bgcolor: 'action.hover' }}>
            <Box 
              sx={{ 
                maxHeight: 256, 
                overflowY: 'auto', 
                p: 2,
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1.5
              }}
            >
              {chatMessages.map((msg, idx) => (
                <Box 
                  key={idx} 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: msg.sender === 'ai' ? 'flex-start' : 'flex-end'
                  }}
                >
                  <Box 
                    sx={{ 
                      maxWidth: '75%', 
                      p: 1.5, 
                      borderRadius: 2,
                      bgcolor: msg.sender === 'ai' ? 'primary.lightest' : 'grey.200',
                      color: msg.sender === 'ai' ? 'primary.dark' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2">
                      {msg.message}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            
            <Divider />
            
            <Box sx={{ p: 1.5, display: 'flex' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask a question (e.g., What channels are usually used for lead-gen?)"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{ 
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  boxShadow: 'none'
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Collapse>
      </Box>
      
      {/* Overall Actions */}
      <Box 
        sx={{ 
          bgcolor: 'action.hover', 
          p: 2, 
          borderTop: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AlertCircle size={18} style={{ marginRight: 8, color: '#f59e0b' }} />
          <Typography variant="body2" color="text.secondary">
            2 critical issues should be resolved before proceeding
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" color="inherit" sx={{ textTransform: 'none' }}
          onClick={onBackward}
          >
            Back to Tool Sync
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            endIcon={<ArrowRight size={16} />}
            sx={{ textTransform: 'none' }}
            onClick={onNext}
          >
            Next: Confirmation
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AIReviewSuggestionPanel;
