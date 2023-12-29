import React from 'react'
import styles from "./ToDo.module.css";

import ToDoHeader from './components/ToDoHeader';
import ToDoBody from './components/ToDoBody';
import ToDoFooter from './components/ToDoFooter';

const ToDo = (props) => {
  return (
    <div className={styles.ToDoContainer}>
      <ToDoHeader />
      <ToDoBody toDos={props.toDos} setToDos={props.setToDos}/>
      <ToDoFooter />
    </div>
  )
}

export default ToDo
