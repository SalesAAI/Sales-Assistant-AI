import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Grid
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface ScriptModeSelectorProps {
  activeMode: 'custom' | 'hybrid' | 'ai' | null;
  onModeSelect: (mode: 'custom' | 'hybrid' | 'ai') => void;
}

const modes = [
  {
    id: 'custom',
    title: 'Custom Script',
    description: 'Upload and use your own sales scripts',
    icon: <UploadFileIcon sx={{ fontSize: 40 }} />,
    color: '#3498db'
  },
  {
    id: 'hybrid',
    title: 'Hybrid Mode',
    description: 'Enhance your scripts with AI suggestions',
    icon: <AutoFixHighIcon sx={{ fontSize: 40 }} />,
    color: '#2ecc71'
  },
  {
    id: 'ai',
    title: 'AI Script',
    description: 'Let AI generate optimized scripts',
    icon: <SmartToyIcon sx={{ fontSize: 40 }} />,
    color: '#9b59b6'
  }
] as const;

const ScriptModeSelector: React.FC<ScriptModeSelectorProps> = ({
  activeMode,
  onModeSelect
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" gutterBottom>
        Select Script Mode
      </Typography>
      <Grid container spacing={3}>
        {modes.map((mode) => (
          <Grid item xs={12} md={4} key={mode.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                },
                border: activeMode === mode.id ? `2px solid ${mode.color}` : 'none'
              }}
            >
              <CardActionArea
                onClick={() => onModeSelect(mode.id)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 2,
                  padding: 3
                }}>
                  <Box sx={{ 
                    color: mode.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {mode.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {mode.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mode.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScriptModeSelector;
