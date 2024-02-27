import React, { useEffect, useState } from "react";
import styles from "../TimerWidget.module.css";
import SelectDropdown from "../timer/components/SelectDropDown";
import { sixtyArray, hoursArray } from "../utilities/utilities.js";
import Button from "../UI/Button.jsx";

const BreakTimer = ({
  setRounds,
  setIsTimerActive,
  rounds,
  userRounds,
  setTimerFinished,
  isTimerActive,
  isBreakActive,
  setIsBreakActive,
  setInitialValues,
  initialValues,
  handleBreakReset,
  pickedSound,
}) => {
  const [breakTime, setBreakTime] = useState(initialValues.break);
  const [isEditing, setIsEditing] = useState(false);

  const audio = pickedSound ? new Audio(pickedSound) : null;

  function toggleEditing() {
    setIsEditing((prev) => !prev);
    setInitialValues((prev) => {
      return {
        ...prev,
        break: {
          seconds: breakTime.seconds,
          minutes: breakTime.minutes,
          hours: breakTime.hours,
        },
      };
    });
  }

  function toggleActive() {
    setIsBreakActive((prev) => !prev);
  }

  useEffect(() => {
    let interval;

    if (isBreakActive) {
      document.title = `Break - ${
        breakTime.hours > 0 ? breakTime.hours + ":" : ""
      }${
        breakTime.minutes < 10 ? "0" + breakTime.minutes : breakTime.minutes
      }:${
        breakTime.seconds < 10 ? "0" + breakTime.seconds : breakTime.seconds
      }`;
    } else if (breakTime !== initialValues.break) {
      document.title = "Timer Paused";
    } else {
      document.title = "Productivity Manager";
    }

    if (isBreakActive) {
      interval = setInterval(() => {
        setBreakTime((prevValue) => {
          const newSeconds =
            prevValue.seconds === 0 ? 59 : prevValue.seconds - 1;
          const newMinutes =
            prevValue.seconds === 0 && prevValue.minutes > 0
              ? prevValue.minutes - 1
              : prevValue.minutes;
          const newHours =
            prevValue.seconds === 0 &&
            prevValue.minutes === 0 &&
            prevValue.hours > 0
              ? prevValue.hours - 1
              : prevValue.hours;

          if (newSeconds < 1 && newMinutes < 1 && newHours < 1) {
            if (rounds === userRounds) {
              setBreakTime(initialValues.break);
            }

            setIsTimerActive(rounds === userRounds ? false : true);
            setRounds((prev) => prev + 1);
            handleBreakReset(setBreakTime);
            clearInterval(interval);
            setTimerFinished(rounds === userRounds ? true : false);
            setIsBreakActive(false);
            if (audio) {
              audio.play();
            }
          }

          return {
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [breakTime, isBreakActive, rounds]);

  return (
    <div className={styles.break_timer_container}>
      <h4 className={styles.break_timer_heading}>Break</h4>
      {isEditing ? (
        <div className={styles.break_timer_labelSelectContainer}>
          {Object.keys(breakTime).map((key) => (
            <SelectDropdown
              key={key}
              label={key}
              value={breakTime[key]}
              onChange={setBreakTime}
              options={key === "hours" ? hoursArray : sixtyArray}
            />
          ))}
        </div>
      ) : (
        <p className={styles.break_timer_time}>
          <span>{breakTime.hours > 0 ? `${breakTime.hours}:` : null}</span>
          <span>
            {breakTime.minutes < 10
              ? `0${breakTime.minutes}`
              : breakTime.minutes}
          </span>
          :
          <span>
            {breakTime.seconds === 60
              ? "00"
              : breakTime.seconds < 10
              ? `0${breakTime.seconds}`
              : breakTime.seconds}
          </span>
        </p>
      )}
      <div>
        <Button
          color="blue"
          onClick={toggleEditing}
          disabled={isTimerActive || isBreakActive}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          color="yellow"
          disabled={isEditing || isTimerActive}
          onClick={() => handleBreakReset(setBreakTime)}
        >
          Reset
        </Button>
        <Button
          color="red"
          disabled={
            isEditing ||
            isTimerActive ||
            (!isTimerActive &&
              !isBreakActive &&
              breakTime === initialValues.break)
          }
          onClick={toggleActive}
        >
          {isBreakActive ? "Stop" : "Resume"}
        </Button>
      </div>
    </div>
  );
};

export default BreakTimer;
