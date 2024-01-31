import React, { useState } from 'react'
import styles from './HabitTrackerApp.module.css'
import HabitTrackerContainer from './containers/HabitTrackerContainer'

const HabitTrackerApp = () => {

  const [habits, setHabit] = useState([
    {
        name: 'Vitamíny',
        frequency: 7
    }
  ]);

  return (
    <div className={styles.container}>
      <HabitTrackerContainer habits={habits} />
    </div>
  )
}

export default HabitTrackerApp
