import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        '&:hover': onClick ? {
          opacity: 0.8
        } : undefined
      }}
      onClick={onClick}
    >
      <Box 
        component="img" 
        src="/logo.svg" 
        alt="Sales Assistant AI" 
        sx={{ 
          height: isMobile ? '48px' : isTablet ? '56px' : '64px',
          width: isMobile ? '48px' : isTablet ? '56px' : '64px',
          borderRadius: '12px',
          backgroundColor: '#2c3e50',
          padding: isMobile ? '4px' : '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} 
      />
      <Typography 
        variant={isMobile ? "h6" : "h5"}
        sx={{ 
          ml: 2,
          fontWeight: 600,
          background: 'linear-gradient(45deg, #3498db, #2980b9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          whiteSpace: 'nowrap',
          fontSize: isMobile ? '1.4rem' : isTablet ? '1.7rem' : '2rem',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          height: isMobile ? '48px' : isTablet ? '56px' : '64px',
          lineHeight: 1.2
        }}
      >
        Sales Assistant AI
      </Typography>
    </Box>
  );
};

export default Logo;
