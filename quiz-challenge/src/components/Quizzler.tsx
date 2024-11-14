import { useNavigate } from 'react-router-dom';
import ForgeLogo from '../assets/ForgeLogo.svg';
import Ai from '../assets/Ai.svg';
import { MaterialSymbolsArrowRightAltRounded } from './MaterialSymbolsArrowRightAltRounded';

const Quizzler = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/Quiz');
  };

  return (
    <div className="bg-[#4242E0] text-[#EBEFF2] h-screen flex items-center justify-center z-10">
      <img
        src={Ai}
        alt="vector"
        className="absolute top-0 left-0 h-full w-full object-cover"
      />

      <div className="flex flex-col items-end text-right max-w-full md:max-w-[60vw] z-20">
        <h1
          className="text-[5em] md:text-[12em] font-normal leading-none m-0 p-0"
          style={{
            fontFamily: 'Bebas Neue',
            lineHeight: '1',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
        >
          QUIZZLER
        </h1>

        <div className="relative mb-6 w-3/4 sm:w-1/2 max-w-xs flex flex-row items-start justify-end z-10">
          <span
            className="h-full flex items-start px-2 text-sm font-light leading-none"
            style={{
              fontFamily: 'Arial, sans-serif',
            }}
          >
            BY:
          </span>
          <img src={ForgeLogo} alt="ForgeLogo" className="w-auto h-[2.5em]" />
        </div>

        
         
            <div className='flex flex-row hover:scale-105 transition-all 300ms ease-in-out  align-center justify-center '>

        <p
          onClick={startQuiz}
          className=" z-20 w-auto cursor-pointer text-xl sm:text-2xl   flex items-center" style={{
            fontFamily: 'Sora',
            lineHeight: '1',
            textUnderlinePosition: 'from-font',
            textDecorationSkipInk: 'none',
          }}
          >
          Let's start the quiz
        </p>
          <MaterialSymbolsArrowRightAltRounded className="  h-[2em] w-auto ml-1 cursor-pointer " />
            </div>
          
      </div>
    </div>
  );
};

export default Quizzler;
