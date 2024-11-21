import React, { useEffect, useState, useCallback } from 'react';
import voiceService from '../services/voiceService';
import { Box, Typography } from '@mui/material';
import { ScenarioType, DifficultyLevel } from '../types/practice';

interface VoicePracticeModeProps {
  isActive: boolean;
  selectedScenario: ScenarioType | null;
  selectedDifficulty: DifficultyLevel | null;
  onSpeechDetected: (text: string) => void;
  onBotResponse: (response: string) => void;
}

const VoicePracticeMode: React.FC<VoicePracticeModeProps> = ({
  isActive,
  selectedScenario,
  selectedDifficulty,
  onSpeechDetected,
  onBotResponse
}) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(async () => {
    try {
      await voiceService.startListening();
      setIsListening(true);
      setError(null);
      
      // Announce start of practice
      if (selectedScenario?.welcomeMessage) {
        await voiceService.speak(selectedScenario.welcomeMessage);
      }
    } catch (err) {
      setError('Failed to start voice capture. Please check your microphone permissions.');
      console.error('Voice capture error:', err);
    }
  }, [selectedScenario]);

  const stopListening = async () => {
    try {
      await voiceService.stopListening();
      setIsListening(false);
    } catch (err) {
      console.error('Error stopping voice capture:', err);
    }
  };

  const processUserSpeech = useCallback(async (text: string) => {
    try {
      // Here we would integrate with AI service to get response
      // We can use selectedDifficulty to adjust AI responses
      const response = `AI Response (${selectedDifficulty} mode): ${text}`;
      onBotResponse(response);
      await voiceService.speak(response);
    } catch (err) {
      console.error('Error processing speech:', err);
    }
  }, [onBotResponse, selectedDifficulty]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && isActive) {
        event.preventDefault();
        if (!isListening) {
          startListening();
        } else {
          stopListening();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      stopListening();
    };
  }, [isActive, isListening, startListening]);

  useEffect(() => {
    const handleSpeechDetected = (data: { text: string }) => {
      onSpeechDetected(data.text);
      // Process the speech and get AI response
      processUserSpeech(data.text);
    };

    const handleError = (error: Error) => {
      setError(error.message);
      setIsListening(false);
    };

    voiceService.on('speechDetected', handleSpeechDetected);
    voiceService.on('error', handleError);

    return () => {
      voiceService.removeListener('speechDetected', handleSpeechDetected);
      voiceService.removeListener('error', handleError);
    };
  }, [onSpeechDetected, processUserSpeech]);

  if (!isActive || !selectedScenario || !selectedDifficulty) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        {isListening ? 'Listening... Press spacebar to stop' : 'Press spacebar to start speaking'}
      </Typography>
      {selectedScenario.welcomeMessage && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          {selectedScenario.welcomeMessage}
        </Typography>
      )}
    </Box>
  );
};

export default VoicePracticeMode;
