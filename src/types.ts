export interface FeedbackQuestion {
  id: string;
  text: string;
  category: 'food' | 'service' | 'ambiance' | 'overall';
}

export interface FeedbackResponse {
  questionId: string;
  rating: number;
  timestamp: string;
}

export interface Department {
  id: string;
  name: string;
  notifyOnCategories: string[];
}