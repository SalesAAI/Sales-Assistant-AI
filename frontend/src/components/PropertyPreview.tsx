import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';

const PropertyPreview: React.FC = () => {
  return (
    <Box sx={{ my: 3 }}>
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800"
        alt="Sample Property"
        sx={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          mb: 2,
        }}
      />
      
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          pl: 1.5, 
          mb: 2,
          pr: 1.5
        }}
      >
        {/* Left Column - Address and State */}
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#666',
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span style={{ fontWeight: 600, color: '#2c3e50' }}>Address:</span>
            123 Main St 10101
          </Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span style={{ fontWeight: 600, color: '#2c3e50' }}>State:</span>
            New York
          </Typography>
        </Grid>

        {/* Right Column - Name and Number */}
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#666',
              mb: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span style={{ fontWeight: 600, color: '#2c3e50' }}>Name:</span>
            Mike Towers
          </Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span style={{ fontWeight: 600, color: '#2c3e50' }}>Number:</span>
            (555) 444-1111
          </Typography>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          pl: 1.5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#006AFF',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textTransform: 'none',
            padding: '6px 16px',
            height: '36px',
            '&:hover': {
              backgroundColor: '#0053CC',
            },
          }}
        >
          <Box
            component="img"
            src="https://s.zillowstatic.com/pfs/static/z-logo-white.svg"
            alt="Zillow"
            sx={{
              height: '20px',
              width: 'auto',
            }}
          />
          Zillow
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#D92228',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textTransform: 'none',
            padding: '6px 16px',
            height: '36px',
            '&:hover': {
              backgroundColor: '#B91B20',
            },
          }}
        >
          <Box
            component="img"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="Redfin"
            sx={{
              height: '20px',
              width: 'auto',
            }}
          />
          Redfin
        </Button>
      </Box>
    </Box>
  );
};

export default PropertyPreview;
