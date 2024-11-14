import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types/QuizQuestion';

interface QuestionProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}

const answerLabels = ['A', 'B', 'C', 'D'];

const Question: React.FC<QuestionProps> = ({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswer = (key: string) => {
    const isCorrect = question.correct_answers[`${key}_correct`] === 'true';
    setSelectedAnswer(key);
    onAnswer(isCorrect);
  };

  return (
    <main className="flex flex-col items-center justify-center px-4 max-w-[700px] ">
      <h1 className="text-[5em] font-bold text-[#4242E0] mb-4"  style={{
                fontFamily: 'Bebas Neue',
                lineHeight: '1',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}>
        QUESTION {questionIndex + 1} / {totalQuestions}
      </h1>
      <h2 className="text-2xl font-semibold mb-4 text-center px-2 text-[#4242E0] font-sora"  style={{
            fontFamily: 'Sora',
            lineHeight: '1',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }} >
        {question.question}
      </h2>
      <div className="flex flex-col gap-4 w-[100%] mt-16">
        {Object.entries(question.answers).map(([key, answer], index) =>
          answer ? (
            <div 
            key={key}
            onClick={() => handleAnswer(key)}
            className={`pr-2 py-10 flex items-center w-[100%] z-40 h-[100px] border-2 border-[#4242E0] cursor-pointer font-sora transition duration-200 ease-in-out group ${
              selectedAnswer === key 
                ? 'bg-[#4242E0] text-[#EBEFF2]' 
                : 'bg-transparent hover:bg-[#4242E0]'
            }`}
          >
            <span
              className={`mx-4 w-10 h-10 flex items-center justify-center font-bold text-lg font-sora ${
                selectedAnswer === key 
                  ? 'bg-[#4242E0] text-[#EBEFF2] border border-[#EBEFF2]' 
                  : 'bg-[#4242E0] text-[#EBEFF2] group-hover:text-[#EBEFF2] group-hover:border group-hover:border-[#EBEFF2]'
              }`}
              style={{ borderRadius: '100vh' ,
                fontFamily: 'Sora',
                lineHeight: '1',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              {answerLabels[index]}
            </span>
          
            <p className={`flex-1 text-left font-sora font-semibold text-xl ${
              selectedAnswer === key 
                ? 'text-[#EBEFF2]' 
                : 'text-[#4242E0] group-hover:text-[#EBEFF2]'
            }`}  style={{
              fontFamily: 'Sora',
              lineHeight: '1',
              textUnderlinePosition: 'from-font',
              textDecorationSkipInk: 'none',
            }}>
              {answer} 
            </p>
          </div>
          
          

          
          
          ) : null
        )}
      </div>
    </main>
  );
};

export default Question;
