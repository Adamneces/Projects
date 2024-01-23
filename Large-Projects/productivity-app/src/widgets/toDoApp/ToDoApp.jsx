import React, {useState} from 'react'
import ToDo from './containers/toDoContainer/ToDo'
import Tracker from './containers/Tracker'
import InfoWidget from './containers/InfoWidget'
import DailyTracker from './containers/DailyTracker'

import styles from './ToDoApp.module.css'



const ToDoApp = () => {
  const [toDos, setToDos] = useState([]);

  return (
    <div className={styles.appContainer}>
      <ToDo toDos={toDos} setToDos={setToDos} />
      <Tracker toDos={toDos} />
      <InfoWidget />
      <DailyTracker />
    </div>
  )
}

export default ToDoApp
