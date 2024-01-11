import React, {useState} from 'react'
import styles from "./ToDo.module.css";

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoFooter from './components/ToDoFooter';
import ToDoForm from './components/ToDoForm';

const ToDo = (props) => {

  function handleNewTask(task){
    props.setToDos((prev) => [...prev, task]);
  }

  return (
    <div className={styles.ToDoContainer}>
      <ToDoHeader />
      <ToDoBody 
      toDos={props.toDos} 
      setToDos={props.setToDos}
      />
      <ToDoForm handleNewTask={handleNewTask} />
      <ToDoFooter />
    </div>
  )
}

export default ToDo
