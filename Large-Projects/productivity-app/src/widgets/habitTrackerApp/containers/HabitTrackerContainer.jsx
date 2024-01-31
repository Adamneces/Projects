import React from 'react'
import style from './HabitTrackerContainer.module.css'
import HabitTrackerHeader from '../components/HabitTrackerHeader'
import HabitTrackerBody from '../components/HabitTrackerBody'

const HabitTrackerContainer = ({habits}) => {
  return (
    <div className={style.container}>
      <HabitTrackerHeader />
      <HabitTrackerBody habits={habits} />
    </div>
  )
}

export default HabitTrackerContainer
