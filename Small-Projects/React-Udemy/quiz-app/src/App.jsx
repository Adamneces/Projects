import React, {useState} from 'react'
import QuizPage from './components/QuizPage'
import QuizOptions from './components/QuizOptions';
import { GeographyQuizOne } from './data';

const App = () => {
    const [page, setPage] = useState(1);
    const [correctCount, setCorrectCount] = useState(0);

    function handlePageChangeFromOptions(event){
        setPage((prev) => prev + 1)
        if (event.target.value === GeographyQuizOne[page - 1].correctAnswer){
            setCorrectCount((prev) => prev + 1)
        }
    }

  return (
    <div className='main'>
      <header>
        <p>question: {page < GeographyQuizOne.length ? page : GeographyQuizOne.length} / {GeographyQuizOne.length} </p>
      </header>  
        <br /><br />
      
      <QuizPage pageNumber={page} />
      <QuizOptions correctAnswers={correctCount} onClick={handlePageChangeFromOptions} answersNumber={page} />
    </div>
  )
}

export default App
