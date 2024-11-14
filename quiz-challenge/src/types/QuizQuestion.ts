
export interface QuizQuestion {
    question: string;
    answers: Record<string, string | null>;
    correct_answers: Record<string, string>;
  }
  