import React from "react";
import quizCompletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round((skippedAnswers.length / userAnswers.length )* 100);
  const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  return (
    <div id="summary">
      <img src={quizCompletedImg} alt="trophy icon" />
      <h2>Quiz completed</h2>
      <div id="summary-stats">
        <p>
        <span className="number correct" style={{color: correctAnswersShare > 75 ? '#0d5725' : correctAnswersShare > 28 ? '#403e12' : '#730b4b'}}>{correctAnswersShare}%</span>
          <span className="text correct">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped answers</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p
                className={
                  answer === QUESTIONS[index].answers[0]
                    ? "user-answer correct"
                    : answer === null
                    ? "user-answer skipped"
                    : "user-answer wrong"
                }
              >
                {answer ?? "not answered"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
