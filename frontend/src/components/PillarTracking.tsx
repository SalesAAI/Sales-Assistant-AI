import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface PillarData {
  name: string;
  progress: number;
  description: string;
  color: string;
}

const pillars: PillarData[] = [
  {
    name: 'Vacancy',
    progress: 75,
    description: 'Current living situation and moving timeline',
    color: '#3498db'
  },
  {
    name: 'Condition',
    progress: 60,
    description: 'Property condition and needed repairs',
    color: '#2ecc71'
  },
  {
    name: 'Motivation',
    progress: 85,
    description: 'Reasons for selling and urgency level',
    color: '#f1c40f'
  },
  {
    name: 'Price',
    progress: 40,
    description: 'Price expectations and market value',
    color: '#e74c3c'
  },
  {
    name: 'Timeframe',
    progress: 90,
    description: 'Desired timeline for selling',
    color: '#9b59b6'
  }
];

const scriptGuideContent = [
  {
    phase: "Introduction",
    text: "Hi, this is [Name] from [Company]. I understand you're interested in selling your property?"
  },
  {
    phase: "Discovery",
    text: "Could you tell me a bit about your current situation and what's prompting you to sell?"
  },
  {
    phase: "Property Details",
    text: "What can you tell me about the property? Have you made any recent improvements?"
  },
  {
    phase: "Timeline & Motivation",
    text: "What's your ideal timeline for selling? Are there any specific circumstances driving this timeline?"
  },
  {
    phase: "Price Discussion",
    text: "Have you had a chance to research property values in your area? What price range are you hoping to achieve?"
  }
];

const PillarTracking: React.FC = () => {
  return (
    <div className="monitor-section">
      <Typography variant="h6" gutterBottom>
        Pillar Tracking
      </Typography>

      <div className="pillar-list">
        {pillars.map(pillar => (
          <div key={pillar.name} className="pillar-item">
            <div className="pillar-header">
              <div className="pillar-title">
                <span className="pillar-name">{pillar.name}</span>
                <Tooltip title={pillar.description} arrow placement="top">
                  <InfoIcon sx={{ 
                    fontSize: 16, 
                    ml: 0.5, 
                    color: 'action.disabled',
                    cursor: 'help'
                  }} />
                </Tooltip>
              </div>
              <span className="pillar-percentage">{pillar.progress}%</span>
            </div>
            <div className="pillar-progress">
              <div 
                className="progress-bar"
                style={{
                  width: `${pillar.progress}%`,
                  backgroundColor: pillar.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Box sx={{ mt: 2, mb: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Typography variant="caption">
          Track and monitor key conversation pillars
        </Typography>
      </Box>

      <Typography variant="h6" gutterBottom>
        Script Guide
      </Typography>

      <Box sx={{ 
        maxHeight: 'calc(100vh - 500px)', 
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
        }
      }}>
        {scriptGuideContent.map((section, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              {section.phase}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default PillarTracking;
