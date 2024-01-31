import React from 'react'
import styles from './HabitTrackerBody.module.css'
import Habit from './bodyComponents/Habit'

const HabitTrackerBody = ({habits}) => {
  return (
    <div className={styles.body}>
      {habits.map((habit) => {
        return <Habit key={habit.name} name={habit.name} frequency={habit.frequency} />
      })}
    </div>
  )
}

export default HabitTrackerBody
