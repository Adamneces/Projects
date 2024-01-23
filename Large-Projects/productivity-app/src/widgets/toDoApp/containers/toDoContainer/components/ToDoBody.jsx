import React, { useState, useEffect } from 'react';
import ToDoTask from './ToDoBodyComponents/ToDoTask';
import styles from './ToDoBody.module.css';

const ToDoBody = ({ toDos, setToDos, displayTasks, filterTasks }) => {

  return (
    <div className={styles.tasksContainer}>
      <ToDoTask 
      filterTasks={filterTasks}
      toDos={toDos} 
      setToDos={setToDos} 
      displayTasks={displayTasks}
      />
    </div>
  );
};

export default ToDoBody;