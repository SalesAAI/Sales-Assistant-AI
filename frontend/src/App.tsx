import React, { useState } from 'react';
import { Box, Container, useTheme, useMediaQuery, Modal, Typography, Button } from '@mui/material';
import PracticeMode from './components/PracticeMode';
import Logo from './components/Logo';
import PDFUploader from './components/PDFUploader';
import PropertyPreview from './components/PropertyPreview';
import ScriptGuide from './components/ScriptGuide';
import './styles/App.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const App: React.FC = () => {
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [customScriptModalOpen, setCustomScriptModalOpen] = useState(false);
  const [hybridModeModalOpen, setHybridModeModalOpen] = useState(false);
  const [aiScriptModalOpen, setAiScriptModalOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePracticeModeToggle = () => {
    setIsPracticeMode(prev => !prev);
  };

  const handleExitPracticeMode = () => {
    setIsPracticeMode(false);
  };

  const handleCustomScriptUploadComplete = () => {
    setCustomScriptModalOpen(false);
  };

  const handleHybridModeUploadComplete = () => {
    setHybridModeModalOpen(false);
  };

  const handleAiScriptClick = () => {
    setShowPulse(true);
    setTimeout(() => {
      setShowPulse(false);
      setAiScriptModalOpen(true);
    }, 300);
  };

  if (isPracticeMode) {
    return <PracticeMode onExitPracticeMode={handleExitPracticeMode} />;
  }

  return (
    <Box className="app-container">
      {showPulse && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(46, 204, 113, 0.3)',
            zIndex: 9999,
            animation: 'pulse 0.3s ease-out',
            '@keyframes pulse': {
              '0%': { opacity: 0 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0 },
            },
          }}
        />
      )}

      <Box 
        className="top-nav" 
        sx={{
          backgroundColor: '#2c3e50',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Container 
          maxWidth={false}
          sx={{ 
            height: '100%',
            padding: 'clamp(0.5rem, 2vw, 1rem)',
          }}
        >
          <Box 
            className="nav-content" 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              gap: { xs: 2, sm: 0 },
              width: '100%',
            }}
          >
            <Box sx={{ mr: { sm: 4 } }}>
              <Logo />
            </Box>
            <Box className="nav-buttons">
              <button className="nav-button phone-dialer">
                <span>📞</span>
                Phone Dialer
              </button>
              <button 
                className="nav-button practice-mode"
                onClick={handlePracticeModeToggle}
              >
                <span>🎯</span>
                Enter Practice Mode
              </button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
        <Box className="script-buttons">
          <button 
            className="script-button"
            onClick={() => setCustomScriptModalOpen(true)}
          >
            <span>📄</span>
            Custom Script
          </button>
          <button 
            className="script-button"
            onClick={() => setHybridModeModalOpen(true)}
          >
            <span>🔄</span>
            Hybrid Mode
          </button>
          <button 
            className="script-button"
            onClick={handleAiScriptClick}
          >
            <span>🤖</span>
            AI Script
          </button>
        </Box>

        <Box className="status">Status: Ready</Box>

        <Box className="monitor-grid">
          <Box className="monitor-panel">
            <h2>Live Transcription</h2>
            <p>Press spacebar to start practice</p>
            
            <PropertyPreview />
            
            <Box className="metrics">
              <h3>Speaking Metrics</h3>
              <p>Speaking Ratio (You/Client)</p>
              <p className="ratio">0% / 0%</p>
              <p>Call Duration</p>
              <p className="duration">00:00</p>
            </Box>
          </Box>

          <Box className="right-panel">
            <Box className="monitor-panel">
              <h2>Conversation Pillars</h2>
              <Box className="pillars">
                <Box className="pillar">
                  <Box className="pillar-header">
                    <span>Vacancy</span>
                    <span>45%</span>
                  </Box>
                  <Box className="progress-bar">
                    <Box className="progress" sx={{ width: '45%', backgroundColor: '#2ecc71' }} />
                  </Box>
                </Box>
                <Box className="pillar">
                  <Box className="pillar-header">
                    <span>Condition</span>
                    <span>36%</span>
                  </Box>
                  <Box className="progress-bar">
                    <Box className="progress" sx={{ width: '36%', backgroundColor: '#3498db' }} />
                  </Box>
                </Box>
                <Box className="pillar">
                  <Box className="pillar-header">
                    <span>Motivation</span>
                    <span>38%</span>
                  </Box>
                  <Box className="progress-bar">
                    <Box className="progress" sx={{ width: '38%', backgroundColor: '#e67e22' }} />
                  </Box>
                </Box>
                <Box className="pillar">
                  <Box className="pillar-header">
                    <span>Price</span>
                    <span>52%</span>
                  </Box>
                  <Box className="progress-bar">
                    <Box className="progress" sx={{ width: '52%', backgroundColor: '#9b59b6' }} />
                  </Box>
                </Box>
                <Box className="pillar">
                  <Box className="pillar-header">
                    <span>Timeframe</span>
                    <span>36%</span>
                  </Box>
                  <Box className="progress-bar">
                    <Box className="progress" sx={{ width: '36%', backgroundColor: '#34495e' }} />
                  </Box>
                </Box>
              </Box>

              <Box className="notes-section">
                <h3>Quick Notes</h3>
                <input type="text" placeholder="Add a quick note..." />
                <p className="empty-state">No notes yet</p>
              </Box>
            </Box>

            <Box className="monitor-panel" sx={{ mt: 3 }}>
              <ScriptGuide />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Custom Script Upload Modal */}
      <Modal
        open={customScriptModalOpen}
        onClose={() => setCustomScriptModalOpen(false)}
        aria-labelledby="custom-script-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload Custom Script
          </Typography>
          <PDFUploader onUploadComplete={handleCustomScriptUploadComplete} />
        </Box>
      </Modal>

      {/* Hybrid Mode Upload Modal */}
      <Modal
        open={hybridModeModalOpen}
        onClose={() => setHybridModeModalOpen(false)}
        aria-labelledby="hybrid-mode-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Upload Script for Hybrid Mode
          </Typography>
          <PDFUploader onUploadComplete={handleHybridModeUploadComplete} />
        </Box>
      </Modal>

      {/* AI Script Modal */}
      <Modal
        open={aiScriptModalOpen}
        onClose={() => setAiScriptModalOpen(false)}
        aria-labelledby="ai-script-modal"
      >
        <Box sx={modalStyle}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              fontWeight: 500
            }}
          >
            AI Script Generation
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#2ecc71',
              color: 'white',
              fontSize: '1rem',
              padding: '8px 24px',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(46, 204, 113, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#27ae60',
                transform: 'translateY(-1px)',
                boxShadow: '0 3px 6px rgba(46, 204, 113, 0.3)',
              }
            }}
            onClick={() => setAiScriptModalOpen(false)}
          >
            Done
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default App;
