import React from 'react'
import styles from './Habit.module.css'

const Habit = ({name, children}) => {
  return (
    <div className={styles.container}>
        <p className={styles.habitName}>{name}</p>
        <div className={styles.checkboxesContainer}>
          {children}
        </div>
    </div>
  )
}

export default Habit
