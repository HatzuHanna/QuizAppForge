import { useEffect, useState, useRef } from 'react';
import { fetchQuizQuestions } from '../services/quizServices';
import { useNavigate } from 'react-router-dom';
import { QuizQuestion } from '../types/QuizQuestion';
import Question from './Question';
import Ai2 from '../assets/Ai2.svg';
import Ai from '../assets/Ai.svg';
import Forge2 from '../assets/Forge2.svg';

const Quiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(
    () => Number(localStorage.getItem('currentQuestionIndex')) || 0
  );
  const [score, setScore] = useState<number>(() => Number(localStorage.getItem('score')) || 0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(
    () => JSON.parse(localStorage.getItem('isQuizFinished') || 'false')
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questionsLoaded = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!questionsLoaded.current) {
      questionsLoaded.current = true;
      loadQuestions();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', String(currentQuestionIndex));
    localStorage.setItem('score', String(score));
    localStorage.setItem('isQuizFinished', JSON.stringify(isQuizFinished));
  }, [currentQuestionIndex, score, isQuizFinished]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const quizQuestions = await fetchQuizQuestions(10);
      setQuestions(quizQuestions);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setIsAnswered(true);  
  };

  const goToNextQuestion = () => {
    setIsAnswered(false); 
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const restartQuiz = () => {
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('score');
    localStorage.removeItem('isQuizFinished');
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizFinished(false);
    navigate('/');
  };

  if (isLoading) return <div className="z-20 w-full h-full flex flex-col items-center py-4 justify-center bg-[#C8D2DA] "> <img
  src={Ai2}
  alt="vector"
  className="absolute top-0 left-[-20em] h-full w-auto object-cover"
/>
<img
  src={Forge2}
  alt="Forge Logo"
  className="absolute top-5 right-5 h-[2.5em] w-auto object-cover"
/>Loading questions...</div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex flex-col     h-screen bg-[#C8D2DA]   z-10 ">
      
      {!isQuizFinished ? (
        currentQuestion ? (
          <main className="z-20 w-full  flex flex-col items-center justify-center pt-40 pb-20 bg-[#C8D2DA] ">
            <img
              src={Ai2}
              alt="vector"
              className="absolute top-0 left-[-20em] h-screen w-auto object-cover"
            />
            <img
              src={Forge2}
              alt="Forge-Logo"
              className="absolute top-5 right-5 h-[2.5em] w-auto object-cover"
            />
            <Question
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onAnswer={handleAnswer}
            />
            <button
              onClick={goToNextQuestion}
              className={` active:scale-95 z-20 mt-8 px-8 py-4 font-bold shadow-md transition text-xl  cursor-pointer duration-200 ease-in-out ${
                isAnswered
                  ? "bg-[#4242E0] text-white hover:bg-[#4233E8]  "
                  : "bg-[#EBEFF2] text-[#B2BCC3] pointer-events-none "
              }`}
              disabled={!isAnswered}
            >
              Next
            </button>
          </main>
        ) : (
          <p className="text-center text-gray-500">Loading question...</p>
        )
      ) : (
        <main className="text-center z-10 h-full w-full gap-4 flex flex-row items-center justify-center bg-[#4242E0]">
          <img
            src={Ai}
            alt="vector"
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
          <section className="h-full w-[50vw] flex flex-col pt-[10em] z-20 px-20">
            <h1
              className="text-[3em] md:text-[10em] sm:text-[2em] xl:text-[15em] font-normal leading-none z-20 text-right text-[#EBEFF2]"
              style={{
                fontFamily: 'Bebas Neue',
                lineHeight: '1',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              BRAVO!
            </h1>
            <h2
              className="text-[2em] md:text-[5em] xl:text-[10em] font-normal leading-none z-20 text-right text-[#EBEFF2]"
              style={{
                fontFamily: 'Bebas Neue',
                lineHeight: '1',
                textUnderlinePosition: 'from-font',
                textDecorationSkipInk: 'none',
              }}
            >
              YOU HAVE SCORED
            </h2>
            <button
              onClick={restartQuiz}
              className=" hover:scale-105 mt-4 py-2 px-6 text-white rounded-lg transition duration-300 ease-in-out text-right underline"
            >
              Wanna play again?
            </button>
          </section>
          <section className="h-full w-[50vw] bg-transparent z-20">
            <div className="h-full w-[80%] bg-[#EBEFF2] z-20 flex flex-row pt-[9em] xl:pt-[10em] justify-center">
              <p
                className="text-[5em] md:text-[15em] xl:text-[20em] font-normal leading-none z-20 text-[#4242E0]"
                style={{
                  fontFamily: 'Bebas Neue',
                  lineHeight: '1',
                  textUnderlinePosition: 'from-font',
                  textDecorationSkipInk: 'none',
                }}
              >
                {score}/{questions.length}
              </p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Quiz;
