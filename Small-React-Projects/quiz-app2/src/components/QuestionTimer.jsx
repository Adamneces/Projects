import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("setting timeout");
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    console.log("setting interval");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 25);
    }, 25);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      style={{ width: "80%" }}
      value={remainingTime}
      max={timeout}
      id="question-time"
      className={mode}
    />
  );
};

export default QuestionTimer;
