import React, {useState} from 'react'
import QuizEndMessage from './QuizEndMessage';
import { GeographyQuizOne } from '../data'; 
// import { correctAnswers } from '../data';
// import { quizAnswers } from '../data';

const QuizOptions = (props) => {
  const isIt = props.answersNumber === GeographyQuizOne.length + 1;
console.log(isIt);
  return (
    <div className='questionContainer'>
      {!isIt ? GeographyQuizOne[props.answersNumber - 1].answers.map((answer) => {
        return <button value={answer} onClick={props.onClick} key={answer}>{answer}</button>
      }) : <QuizEndMessage correctAnswers={props.correctAnswers} />}
    </div>
  )
}

export default QuizOptions
