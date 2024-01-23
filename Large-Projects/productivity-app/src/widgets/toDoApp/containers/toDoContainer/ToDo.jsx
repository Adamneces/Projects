import React, {useState} from 'react'
import styles from "./ToDo.module.css";

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoForm from './components/ToDoForm';

const ToDo = (props) => {
  const [displayTasks, setDisplayTasks] = useState('today');
  const [filterTasks, setFilterTasks] = useState('priority');

  function handleSetDisplayTasks(date) {
    setDisplayTasks(date);
  }

  function handleNewTask(task){
    props.setToDos((prev) => [...prev, task]);
  }

  return (
    <div className={styles.ToDoContainer}>
      <ToDoHeader 
      setDisplayTasks={handleSetDisplayTasks} 
      setFilterTasks={setFilterTasks}
      />
      <ToDoBody 
      toDos={props.toDos} 
      setToDos={props.setToDos}
      displayTasks={displayTasks}
      filterTasks={filterTasks}
      />
      <ToDoForm handleNewTask={handleNewTask} />
    </div>
  )
}

export default ToDo
