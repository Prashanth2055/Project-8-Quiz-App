import { useState, useEffect } from 'react';
import './App.css';
import quizQuestions from './file/data.json'

function App() {
  const [selectedAnswer,setSelectedAnswer] = useState("")
  const [answered,setAnswered] = useState(false)
  const [round,setRound] = useState(0)
  const [score,setScore] = useState(0)
  const [showScore,setShowScore] = useState(false)
  const [shuffledOptions,setShuffledOptions] = useState([])
  const quiz = quizQuestions[round]

  const handleAnswer = (option,answer) => {
    if(answered) return;

    setAnswered(true)
    setSelectedAnswer(option)

   if(option === answer){
    setScore(prevScore => prevScore + 1)
   }
   
   setTimeout(() => {
    if (round === quizQuestions.length - 1) {
    setShowScore(true)
    } else {
    setRound(prevRound => prevRound + 1)
    setSelectedAnswer("")
    setAnswered(false)
    }
   }, 1000)

  if(round === 9){
    setShowScore(true)
  }
  }

  const handleRestart = () => {
    setSelectedAnswer("")
    setAnswered(false)
    setRound(0)
    setScore(0)
    setShowScore(false)
  }

  const shuffleOptions = (options) => {
    return [...options].sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    setShuffledOptions(shuffleOptions(quizQuestions[round].options))
  }, [round])

  
  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='flex flex-col items-center justify-center gap-10'>
        <header className='mt-10'>
          <h1 className='text-5xl font-bold'>Quiz App</h1>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-5">
        <div className='bg-blue-600 h-3 rounded-full'
        style={{width : `${((round + 1) / quizQuestions.length * 100)}%`}}>
        </div>
        </div>
        </header>
        {
          !showScore &&
          <div>
              <h3 className="text-3xl font-semibold flex items-center justify-center">{quiz.question}</h3>
              {shuffledOptions.map(option => (
                <p onClick={() => handleAnswer(option, quiz.answer)} className={`p-6 mt-10 border flex items-center justify-center text-2xl cursor-pointer ${selectedAnswer === option ? option === quiz.answer ? "bg-green-100" : "bg-red-100" : "bg-white hover:bg-blue-100"}`}>{option}</p>
              ))}
        </div>
        }
        {
          showScore &&
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
        <div className='bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200'>
        <p className="text-lg text-gray-500 font-medium mb-2">Quiz Completed!</p>
        <h2 className="text-4xl font-extrabold text-gray-800"> Your Score </h2>
        <p className="text-6xl font-black text-blue-600 mt-4"> {score} </p>
        <p className="text-gray-500 mt-3"> Great job! 🎉 </p>
        <div onClick={() => handleRestart()} className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md cursor-pointer">Restart Game</div>
        </div>
        </div>  
        }     
        </div>
    </div>
  );
}

export default App;
