import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';

const DialerPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '400px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
}));

const NumberDisplay = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: '24px',
    textAlign: 'center',
    letterSpacing: '1px'
  }
});

const DialButton = styled(IconButton)(({ theme }) => ({
  width: '72px',
  height: '72px',
  margin: '8px',
  fontSize: '24px',
  backgroundColor: '#f8f9fa',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: '#e9ecef'
  },
  '& .sub-text': {
    fontSize: '12px',
    color: theme.palette.text.secondary,
    marginTop: '2px'
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: '72px',
  height: '72px',
  margin: '8px',
  borderRadius: '36px',
  minWidth: 'unset'
}));

interface DialButtonProps {
  number: string;
  letters?: string;
  onClick: (value: string) => void;
}

const DialPadButton: React.FC<DialButtonProps> = ({ number, letters, onClick }) => (
  <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
    <DialButton onClick={() => onClick(number)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span>{number}</span>
        {letters && <span className="sub-text">{letters}</span>}
      </Box>
    </DialButton>
  </Grid>
);

const PhoneDialer: React.FC = () => {
  const [number, setNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);

  const handleNumberClick = (value: string) => {
    if (number.length < 15) {
      setNumber(prev => prev + value);
    }
  };

  const handleBackspace = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (number && !isCallActive) {
      setIsCallActive(true);
      // Implement call functionality here
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    // Implement end call functionality here
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    return `${match[1]}${match[1] && match[2] ? '-' : ''}${match[2]}${match[2] && match[3] ? '-' : ''}${match[3]}`;
  };

  const dialPadButtons = [
    { number: '1', letters: '' },
    { number: '2', letters: 'ABC' },
    { number: '3', letters: 'DEF' },
    { number: '4', letters: 'GHI' },
    { number: '5', letters: 'JKL' },
    { number: '6', letters: 'MNO' },
    { number: '7', letters: 'PQRS' },
    { number: '8', letters: 'TUV' },
    { number: '9', letters: 'WXYZ' },
    { number: '*', letters: '' },
    { number: '0', letters: '+' },
    { number: '#', letters: '' }
  ];

  return (
    <DialerPaper elevation={0}>
      <Typography variant="h6" gutterBottom align="center">
        Phone Dialer
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <NumberDisplay
          fullWidth
          variant="outlined"
          value={formatPhoneNumber(number)}
          InputProps={{
            readOnly: true,
            endAdornment: number && (
              <IconButton onClick={handleBackspace} size="small">
                <BackspaceIcon />
              </IconButton>
            )
          }}
        />
      </Box>

      <Grid container spacing={1}>
        {dialPadButtons.map((button) => (
          <DialPadButton
            key={button.number}
            number={button.number}
            letters={button.letters}
            onClick={handleNumberClick}
          />
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        {isCallActive ? (
          <Tooltip title="End Call">
            <ActionButton
              variant="contained"
              color="error"
              onClick={handleEndCall}
            >
              <CallEndIcon />
            </ActionButton>
          </Tooltip>
        ) : (
          <Tooltip title={number ? 'Start Call' : 'Enter a number'}>
            <span>
              <ActionButton
                variant="contained"
                color="success"
                onClick={handleCall}
                disabled={!number}
              >
                <CallIcon />
              </ActionButton>
            </span>
          </Tooltip>
        )}
      </Box>
    </DialerPaper>
  );
};

export default PhoneDialer;
