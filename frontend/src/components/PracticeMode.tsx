import React, { useState } from 'react';
import { Box, Button, Card, Typography, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VoicePracticeMode from './VoicePracticeMode';
import PDFUploader from './PDFUploader';
import Logo from './Logo';
import { ScenarioType, DifficultyLevel } from '../types/practice';

const scenarios: ScenarioType[] = [
  {
    id: 'cold-calling',
    name: 'Cold Calling Practice',
    title: 'Cold Calling Practice',
    description: 'Practice cold calling with AI-powered voice interactions.',
    welcomeMessage: 'Welcome to cold calling practice. Press spacebar to begin.'
  },
  {
    id: 'first-time',
    name: 'First-Time Sellers',
    title: 'First-Time Sellers',
    description: 'Practice with inexperienced home sellers who need guidance through the process.',
    welcomeMessage: 'Welcome to first-time seller practice. Press spacebar to begin.'
  },
  {
    id: 'investment',
    name: 'Investment Property Owners',
    title: 'Investment Property Owners',
    description: 'Work with experienced investors focused on ROI and market analysis.',
    welcomeMessage: 'Welcome to investment property practice. Press spacebar to begin.'
  }
];

interface PracticeModeProps {
  onExitPracticeMode?: () => void;
}

const PracticeMode: React.FC<PracticeModeProps> = ({ onExitPracticeMode }) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [isPracticing, setIsPracticing] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [showPDFUploader, setShowPDFUploader] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleScenarioSelect = (scenario: ScenarioType) => {
    setSelectedScenario(scenario);
  };

  const handleDifficultySelect = (difficulty: DifficultyLevel) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStartPractice = () => {
    if (selectedScenario && selectedDifficulty) {
      setIsPracticing(true);
    }
  };

  const handleSpeechDetected = (text: string) => {
    setTranscript(text);
  };

  const handleTrainAI = () => {
    setShowPDFUploader(true);
  };

  const handleDashboard = () => {
    setShowDashboard(true);
  };

  const handleCloseDialog = () => {
    setShowPDFUploader(false);
    setShowDashboard(false);
  };

  const handlePDFUploadComplete = () => {
    setShowPDFUploader(false);
  };

  if (!isPracticing) {
    return (
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          pb: 2,
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <Logo onClick={onExitPracticeMode} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<UploadFileIcon />}
              onClick={handleTrainAI}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Train AI with PDF
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<DashboardIcon />}
              onClick={handleDashboard}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #3498db, #2980b9)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2980b9, #2c3e50)'
                }
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              color: '#2c3e50'
            }}
          >
            Select Practice Scenario
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id}
                sx={{ 
                  p: 3,
                  cursor: 'pointer',
                  border: selectedScenario?.id === scenario.id ? '2px solid #3498db' : '1px solid #eee',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }
                }}
                onClick={() => handleScenarioSelect(scenario)}
              >
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: '#2c3e50'
                  }}
                >
                  {scenario.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 3, minHeight: '48px' }}
                >
                  {scenario.description}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant={selectedDifficulty === 'beginner' && selectedScenario?.id === scenario.id ? 'contained' : 'outlined'}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScenarioSelect(scenario);
                      handleDifficultySelect('beginner');
                    }}
                    sx={{
                      flex: 1,
                      textTransform: 'none',
                      backgroundColor: selectedDifficulty === 'beginner' && selectedScenario?.id === scenario.id ? '#27ae60' : 'transparent',
                      borderColor: '#27ae60',
                      color: selectedDifficulty === 'beginner' && selectedScenario?.id === scenario.id ? 'white' : '#27ae60',
                      '&:hover': {
                        backgroundColor: '#27ae60',
                        color: 'white'
                      }
                    }}
                  >
                    Beginner
                  </Button>
                  <Button
                    variant={selectedDifficulty === 'advanced' && selectedScenario?.id === scenario.id ? 'contained' : 'outlined'}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScenarioSelect(scenario);
                      handleDifficultySelect('advanced');
                    }}
                    sx={{
                      flex: 1,
                      textTransform: 'none',
                      backgroundColor: selectedDifficulty === 'advanced' && selectedScenario?.id === scenario.id ? '#e74c3c' : 'transparent',
                      borderColor: '#e74c3c',
                      color: selectedDifficulty === 'advanced' && selectedScenario?.id === scenario.id ? 'white' : '#e74c3c',
                      '&:hover': {
                        backgroundColor: '#e74c3c',
                        color: 'white'
                      }
                    }}
                  >
                    Advanced
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!selectedScenario || !selectedDifficulty}
              onClick={handleStartPractice}
              sx={{ 
                minWidth: 240,
                height: 48,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '24px',
                textTransform: 'none',
                background: selectedScenario && selectedDifficulty
                  ? 'linear-gradient(45deg, #3498db, #2980b9)'
                  : 'rgba(0,0,0,0.12)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2980b9, #2c3e50)'
                }
              }}
            >
              Start Practice Session
            </Button>
          </Box>
        </Box>

        {/* PDF Uploader Dialog */}
        <Dialog 
          open={showPDFUploader} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: '12px' }
          }}
        >
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Train AI with PDF
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <PDFUploader onUploadComplete={handlePDFUploadComplete} />
          </Box>
        </Dialog>

        {/* Dashboard Dialog */}
        <Dialog 
          open={showDashboard} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: '12px' }
          }}
        >
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Practice Dashboard
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Practice Statistics
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              <Card sx={{ p: 2, borderRadius: '12px' }}>
                <Typography variant="h6" color="text.secondary">Total Sessions</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50' }}>12</Typography>
              </Card>
              <Card sx={{ p: 2, borderRadius: '12px' }}>
                <Typography variant="h6" color="text.secondary">Average Score</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#27ae60' }}>85%</Typography>
              </Card>
              <Card sx={{ p: 2, borderRadius: '12px' }}>
                <Typography variant="h6" color="text.secondary">Time Practiced</Typography>
                <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c3e50' }}>4.5h</Typography>
              </Card>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Recent Practice Sessions
              </Typography>
              <Card sx={{ p: 2, mb: 2, borderRadius: '12px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Cold Calling Practice
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed 2 hours ago - Score: 88%
                </Typography>
              </Card>
              <Card sx={{ p: 2, mb: 2, borderRadius: '12px' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  First-Time Sellers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed yesterday - Score: 92%
                </Typography>
              </Card>
            </Box>
          </Box>
        </Dialog>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        pb: 2,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Logo onClick={onExitPracticeMode} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
          {selectedScenario?.title} - {selectedDifficulty === 'beginner' ? 'Beginner' : 'Advanced'} Mode
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
        <Box className="monitor-panel">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Live Transcription
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Press spacebar to start practice
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
              Speaking Metrics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Speaking Ratio (You/Client)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              0% / 0%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Call Duration
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              00:00
            </Typography>
          </Box>

          {transcript && (
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              bgcolor: 'background.paper', 
              borderRadius: '8px',
              border: '1px solid rgba(0,0,0,0.1)'
            }}>
              <Typography variant="body1">
                {transcript}
              </Typography>
            </Box>
          )}
        </Box>

        <Box className="monitor-panel">
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Conversation Pillars
          </Typography>
          <Box className="pillars">
            <Box className="pillar">
              <Box className="pillar-header">
                <span>Vacancy</span>
                <span>45%</span>
              </Box>
              <Box className="progress-bar">
                <Box className="progress" sx={{ width: '45%', bgcolor: '#2ecc71' }} />
              </Box>
            </Box>
            <Box className="pillar">
              <Box className="pillar-header">
                <span>Condition</span>
                <span>36%</span>
              </Box>
              <Box className="progress-bar">
                <Box className="progress" sx={{ width: '36%', bgcolor: '#3498db' }} />
              </Box>
            </Box>
            <Box className="pillar">
              <Box className="pillar-header">
                <span>Motivation</span>
                <span>38%</span>
              </Box>
              <Box className="progress-bar">
                <Box className="progress" sx={{ width: '38%', bgcolor: '#e67e22' }} />
              </Box>
            </Box>
            <Box className="pillar">
              <Box className="pillar-header">
                <span>Price</span>
                <span>52%</span>
              </Box>
              <Box className="progress-bar">
                <Box className="progress" sx={{ width: '52%', bgcolor: '#9b59b6' }} />
              </Box>
            </Box>
            <Box className="pillar">
              <Box className="pillar-header">
                <span>Timeframe</span>
                <span>36%</span>
              </Box>
              <Box className="progress-bar">
                <Box className="progress" sx={{ width: '36%', bgcolor: '#34495e' }} />
              </Box>
            </Box>
          </Box>

          <Box className="notes-section">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Notes
            </Typography>
            <input 
              type="text" 
              placeholder="Add a quick note..." 
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No notes yet
            </Typography>
          </Box>

          <Box className="action-section">
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
              Action Items
            </Typography>
            <input 
              type="text" 
              placeholder="Add an action item..." 
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px',
                marginBottom: '8px'
              }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No action items yet
            </Typography>
          </Box>
        </Box>
      </Box>

      <VoicePracticeMode
        isActive={isPracticing}
        selectedScenario={selectedScenario}
        selectedDifficulty={selectedDifficulty}
        onSpeechDetected={handleSpeechDetected}
        onBotResponse={(response) => console.log('Bot response:', response)}
      />
    </Box>
  );
};

export default PracticeMode;
