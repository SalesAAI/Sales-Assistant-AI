import { EventEmitter } from 'events';

class VoiceService extends EventEmitter {
  private isListening: boolean = false;
  private recognition: any = null;
  private synthesis: any = null;

  constructor() {
    super();
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        throw new Error('Speech recognition not supported');
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const transcript = event.results[i][0].transcript;
            console.log('Speech detected:', transcript);
            this.emit('speechDetected', { text: transcript });
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.emit('error', new Error(event.error));
      };

      console.log('Speech recognition initialized');
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
    }
  }

  async startListening() {
    if (this.isListening) return;

    try {
      await this.recognition.start();
      this.isListening = true;
      console.log('Started listening');
      this.emit('listeningStarted');
    } catch (error) {
      console.error('Error starting voice capture:', error);
      throw error;
    }
  }

  async stopListening() {
    if (!this.isListening) return;

    try {
      await this.recognition.stop();
      this.isListening = false;
      console.log('Stopped listening');
      this.emit('listeningStopped');
    } catch (error) {
      console.error('Error stopping voice capture:', error);
      throw error;
    }
  }

  async speak(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        console.log('Speech completed');
        resolve();
      };
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        reject(new Error('Speech synthesis failed'));
      };
      window.speechSynthesis.speak(utterance);
    });
  }
}

export const voiceService = new VoiceService();
export default voiceService;
