import React from 'react'
import { GeographyQuizOne } from '../data'

const QuizEndMessage = (props) => {
  return (
    <div className='resultsNumbers'>
      <p>{props.correctAnswers}/{GeographyQuizOne.length}</p>
      <p>{Math.round((props.correctAnswers / GeographyQuizOne.length) * 100)}%</p>
    </div>
  )
}

export default QuizEndMessage
