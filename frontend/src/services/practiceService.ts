import axios from 'axios';

export interface PracticeMetrics {
  scriptAdherence: number;
  pillarCompletion: number;
  speakingTime: number;
  successRate: number;
}

export interface PracticeFeedback {
  type: 'positive' | 'warning' | 'negative';
  message: string;
  timestamp: number;
}

class PracticeService {
  private baseUrl: string = '/api/practice';

  async startSession(scenarioId: string): Promise<{ sessionId: string }> {
    try {
      const response = await axios.post(`${this.baseUrl}/session/start`, { scenarioId });
      return response.data;
    } catch (error) {
      console.error('Error starting practice session:', error);
      throw error;
    }
  }

  async endSession(sessionId: string): Promise<PracticeMetrics> {
    try {
      const response = await axios.post(`${this.baseUrl}/session/end`, { sessionId });
      return response.data;
    } catch (error) {
      console.error('Error ending practice session:', error);
      throw error;
    }
  }

  async processAudio(sessionId: string, audioData: Blob): Promise<PracticeFeedback> {
    try {
      const formData = new FormData();
      formData.append('audio', audioData);
      formData.append('sessionId', sessionId);

      const response = await axios.post(`${this.baseUrl}/process-audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing audio:', error);
      throw error;
    }
  }

  async getScenarios(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/scenarios`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      throw error;
    }
  }

  async getFeedback(sessionId: string): Promise<PracticeFeedback[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/feedback/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  }

  async getMetrics(sessionId: string): Promise<PracticeMetrics> {
    try {
      const response = await axios.get(`${this.baseUrl}/metrics/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  }
}

export const practiceService = new PracticeService();
export default practiceService;
