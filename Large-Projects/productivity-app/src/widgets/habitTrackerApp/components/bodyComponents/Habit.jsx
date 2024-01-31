import React from 'react'
import styles from './Habit.module.css'

const Habit = ({name, frequency}) => {
  return (
    <div className={styles.container}>
        <p className={styles.habitName}>{name}</p>
        <div className={styles.checkboxesContainer}>
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
            <input type='checkbox' />
        </div>
    </div>
  )
}

export default Habit
