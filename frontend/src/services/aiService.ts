interface ConversationContext {
  text: string;
  timestamp: number;
}

class AIService {
  private conversationHistory: ConversationContext[] = [];

  async processInput(text: string): Promise<string> {
    // Add to conversation history
    this.conversationHistory.push({
      text,
      timestamp: Date.now()
    });

    // Simple response generation
    return `Response to: ${text}`;
  }

  clearContext() {
    this.conversationHistory = [];
  }

  getConversationHistory(): ConversationContext[] {
    return [...this.conversationHistory];
  }
}

export const aiService = new AIService();
export default aiService;
