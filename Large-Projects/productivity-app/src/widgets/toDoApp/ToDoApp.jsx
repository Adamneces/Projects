import React, {useState} from 'react'
import ToDo from './containers/toDoContainer/ToDo'
import Tracker from './containers/Tracker'
import InfoWidget from './containers/InfoWidget'
import DailyTracker from './containers/DailyTracker'

import styles from './ToDoApp.module.css'


const ToDoApp = () => {
  const [toDos, setToDos] = useState([]);

  function isSameDay(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate());
  }
  function parseDate(date) {
    return date instanceof Date ? date : new Date(date);
  }
  function isWithinWeek(date, startOfWeek, endOfWeek) {
    return date >= startOfWeek && date <= endOfWeek;
  }

  return (
    <div className={styles.appContainer}>
      <ToDo toDos={toDos} setToDos={setToDos} />
      <Tracker 
      isSameDay={isSameDay} 
      toDos={toDos} 
      parseDate={parseDate}
      isWithinWeek={isWithinWeek}
      />
      <InfoWidget />
      <DailyTracker isSameDay={isSameDay} toDos={toDos} />
    </div>
  )
}

export default ToDoApp
