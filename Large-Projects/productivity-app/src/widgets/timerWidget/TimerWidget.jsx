import React, { useEffect, useState } from "react";
import styles from "./TimerWidget.module.css";

import Timer from "./timer/Timer";
import BreakTimer from "./breakTimer/BreakTimer";
import Rounds from "./Rounds";
import TimerFinished from "./TimerFinished";
import Sounds from "./Sounds";

export default function TimerWidget() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [userRounds, setUserRounds] = useState(1);
  const [rounds, setRounds] = useState(1);
  const [timerFinished, setTimerFinished] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);

  const [pickedSound, setPickedSound] = useState(null);

  const [initialValues, setInitialValues] = useState({
    timer: { hours: 0, minutes: 20, seconds: 0 },
    break: { hours: 0, minutes: 5, seconds: 0 },
  });

  useEffect(() => {
    if (timerFinished) {
      setPickedSound(null);
      document.title = "Productivity Manager";
    }
  }, [timerFinished]);

  function handleTimerReset(setState) {
    setState({
      seconds: initialValues.timer.seconds,
      minutes: initialValues.timer.minutes,
      hours: initialValues.timer.hours,
    });
  }
  function handleBreakReset(setState) {
    setState({
      seconds: initialValues.break.seconds,
      minutes: initialValues.break.minutes,
      hours: initialValues.break.hours,
    });
  }

  return (
    <div
      className={`${styles.container} ${timerFinished ? styles.animation : ""}`}
    >
      {timerFinished ? (
        <TimerFinished
          setRounds={setRounds}
          setTimerFinished={setTimerFinished}
        />
      ) : (
        <>
          <Timer
            isBreakActive={isBreakActive}
            initialValues={initialValues}
            setInitialValues={setInitialValues}
            isActive={isTimerActive}
            setIsActive={setIsTimerActive}
            rounds={rounds}
            setRounds={setRounds}
            userRounds={userRounds}
            setIsBreakActive={setIsBreakActive}
            handleTimerReset={handleTimerReset}
            pickedSound={pickedSound}
          />
          <BreakTimer
            setInitialValues={setInitialValues}
            initialValues={initialValues}
            setIsTimerActive={setIsTimerActive}
            setRounds={setRounds}
            rounds={rounds}
            userRounds={userRounds}
            setTimerFinished={setTimerFinished}
            isTimerActive={isTimerActive}
            isBreakActive={isBreakActive}
            setIsBreakActive={setIsBreakActive}
            handleBreakReset={handleBreakReset}
            pickedSound={pickedSound}
          />
          <Rounds
            rounds={rounds}
            userRounds={userRounds}
            setUserRounds={setUserRounds}
            setRounds={setRounds}
            isBreakActive={isBreakActive}
            isTimerActive={isTimerActive}
          />
          <Sounds
            isTimerActive={isTimerActive}
            isBreakActive={isBreakActive}
            pickedSound={pickedSound}
            setPickedSound={setPickedSound}
          />
        </>
      )}
    </div>
  );
}
