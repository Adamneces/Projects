import React from 'react'
import { GeographyQuizOne } from '../data';

const QuizPage = (props) => {
    return (
        <div className='questionHeading'>
          {GeographyQuizOne[props.pageNumber - 1] ? (
            <p>{GeographyQuizOne[props.pageNumber - 1].question}</p>
          ) : (
            <p>End of the quiz</p>
          )}
        </div>
      );
}

export default QuizPage;
