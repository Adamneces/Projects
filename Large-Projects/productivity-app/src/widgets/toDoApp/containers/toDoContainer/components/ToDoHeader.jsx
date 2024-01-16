import React, { useState } from 'react';
import styles from './ToDoHeader.module.css';

const ToDoHeader = ({displayTasks, setDisplayTasks}) => {

  return (
    <nav className={styles.header}>
      <h1>My To-Do List</h1>
      <select 
      name="displayTasks" 
      id="displayTasks" 
      onChange={(e) => setDisplayTasks(e.target.value)}
      >
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="week">Later This week</option>
        <option value="all">All of the tasks</option>
      </select>
    </nav>
  );
};
export default ToDoHeader;