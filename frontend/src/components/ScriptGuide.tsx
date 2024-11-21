import React from 'react';
import { Box, Typography } from '@mui/material';

const ScriptGuide: React.FC = () => {
  return (
    <Box 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Script Guide
      </Typography>
      
      <Box 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Script content will be displayed here
        </Typography>
      </Box>
    </Box>
  );
};

export default ScriptGuide;
