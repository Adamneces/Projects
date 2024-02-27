import React, { useState } from "react";
import styles from "./TimerWidget.module.css";
import { iconLeft, iconRight } from "./utilities/utilities";
import Button from "./UI/Button";

const Rounds = ({
  rounds,
  setRounds,
  userRounds,
  setUserRounds,
  isBreakActive,
  isTimerActive,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  function toggleEditing() {
    setIsEditing((prev) => !prev);
  }

  function handleUserRounds(value){
    if (userRounds >= 1 && userRounds <= 19){
      if (value === 1){
        setUserRounds(prev => prev + 1);
      }else if (value === -1){
        setUserRounds(prev => prev - 1);
      }else{
        return;
      }
    }
  }

  return (
    <div className={styles.rounds_container}>
      <h4 className={styles.rounds_heading}>Rounds</h4>
      {isEditing ? (
        <div className={styles.rounds_inputIconsContainer}>
          <button onClick={() => handleUserRounds(-1)}>
            {iconLeft}
          </button>
          <span>{userRounds}</span>
          <button onClick={() => handleUserRounds(1)}>
            {iconRight}
          </button>
        </div>
      ) : (
        <p className={styles.rounds_roundsDisplay}>
          {rounds <= userRounds ? rounds : rounds - 1}/{userRounds}
        </p>
      )}
      <div>
        <Button onClick={toggleEditing}
          disabled={isTimerActive || isBreakActive} color="blue" >
            {isEditing ? "Save" : "Edit"}
        </Button>
        <Button onClick={() => setRounds(1)}
          disabled={isTimerActive || isBreakActive} color="yellow">
            Reset
        </Button>
      </div>
    </div>
  );
};

export default Rounds;
