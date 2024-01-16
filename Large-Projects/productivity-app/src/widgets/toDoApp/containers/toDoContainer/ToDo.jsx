import React, {useState} from 'react'
import styles from "./ToDo.module.css";

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoFooter from './components/ToDoFooter';
import ToDoForm from './components/ToDoForm';

const ToDo = (props) => {
  const [displayTasks, setDisplayTasks] = useState('today');
  console.log(displayTasks);

  function handleSetDisplayTasks(date) {
    setDisplayTasks(date);
  }

  function handleNewTask(task){
    props.setToDos((prev) => [...prev, task]);
  }

  return (
    <div className={styles.ToDoContainer}>
      <ToDoHeader displayTasks={displayTasks} setDisplayTasks={handleSetDisplayTasks} />
      <ToDoBody 
      toDos={props.toDos} 
      setToDos={props.setToDos}
      displayTasks={displayTasks}
      />
      <ToDoForm handleNewTask={handleNewTask} />
      <ToDoFooter />
    </div>
  )
}

export default ToDo
