 
import axios from 'axios';
import { QuizQuestion } from '../types/QuizQuestion';

 
const api = axios.create({
  baseURL: import.meta.env.VITE_QUIZ_API_URL,
  headers: {
    'X-Api-Key': import.meta.env.VITE_QUIZ_API_KEY,
  },
});

 
export const fetchQuizQuestions = async (limit = 5): Promise<QuizQuestion[]> => {
  const maxRetries = 5;  
  const fetchBatchSize = limit * 2; 

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await api.get('', {
        params: {
          limit: fetchBatchSize,
          category: 'Code',
          type: 'multiple', 
        },
      });

     
      const fetchedQuestions: QuizQuestion[] = response.data;

      
      const filteredQuestions = fetchedQuestions.filter((question) => {
        const answerCount = Object.values(question.answers).filter(
          (answer) => answer !== null && answer.trim() !== ''
        ).length;
        return answerCount === 4;
      });

     
      if (filteredQuestions.length >= limit) {
        return filteredQuestions.slice(0, limit);
      }

     
    } catch (error) {
      console.error('Error fetching quiz questions:', error);
    
      break;
    }
  }
 
  return [];
};
