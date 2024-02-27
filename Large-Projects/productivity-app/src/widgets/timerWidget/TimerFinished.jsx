import React from 'react'
import styles from "./TimerWidget.module.css"

const TimerFinished = ({setTimerFinished, setRounds}) => {
function handleGoBack() {
  setTimerFinished(false);
  setRounds(1);
}

  return (
    <div className={styles.timer_finished_container}>
      <h3 className={styles.timer_finished_heading}>Timer finished!</h3>
      <button onClick={handleGoBack} className={styles.timer_finished_backButton}>Go Back</button>
    </div>
  )
}

export default TimerFinished
