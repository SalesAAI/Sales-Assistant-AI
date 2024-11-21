interface TrainingData {
  type: 'pdf' | 'text';
  content: string;
  metadata: {
    title: string;
    dateAdded: Date;
  };
}

interface KnowledgeBaseStatus {
  totalDocuments: number;
  lastUpdated: Date | null;
}

class TrainingService {
  private knowledgeBase: TrainingData[] = [];
  private status: KnowledgeBaseStatus = {
    totalDocuments: 0,
    lastUpdated: null
  };
  private currentPDFContent: string | null = null;

  async addTrainingData(data: TrainingData): Promise<boolean> {
    try {
      // Process and clean the content
      const processedContent = this.processContent(data.content);
      
      // Add to knowledge base
      this.knowledgeBase.push({
        ...data,
        content: processedContent
      });

      // Update status
      this.status = {
        totalDocuments: this.knowledgeBase.length,
        lastUpdated: new Date()
      };

      // Update current PDF content if it's a PDF
      if (data.type === 'pdf') {
        this.currentPDFContent = processedContent;
      }

      console.log('Training data added successfully:', data.metadata.title);
      return true;
    } catch (error) {
      console.error('Error adding training data:', error);
      return false;
    }
  }

  private processContent(content: string): string {
    // Clean and process the content
    return content
      .replace(/\s+/g, ' ')
      .trim();
  }

  getKnowledgeBaseStatus(): KnowledgeBaseStatus {
    return { ...this.status };
  }

  getCurrentPDFContent(): string | null {
    return this.currentPDFContent;
  }

  clearKnowledgeBase(): void {
    this.knowledgeBase = [];
    this.currentPDFContent = null;
    this.status = {
      totalDocuments: 0,
      lastUpdated: null
    };
  }
}

const trainingService = new TrainingService();
export default trainingService;
