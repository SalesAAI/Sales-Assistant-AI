export interface ScenarioType {
  id: string;
  name: string;
  title: string;
  description: string;
  welcomeMessage?: string;
}

export type DifficultyLevel = 'beginner' | 'advanced';

export interface PracticeSession {
  scenario: ScenarioType;
  difficulty: DifficultyLevel;
}
