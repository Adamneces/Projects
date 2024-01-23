import React, { useState } from 'react';
import styles from './ToDoHeader.module.css';

const ToDoHeader = ({setDisplayTasks, setFilterTasks}) => {

  return (
    <nav className={styles.header}>
      <h1 className={styles.heading}>To-Do List</h1>
      <select 
      name="filterBy" 
      id="filterBy"
      onChange={(e) => setFilterTasks(e.target.value)}
      className={styles.dropdown}
      >
        <option value="priority">Priority</option>
        <option value="time">Time</option>
      </select>
      <select 
      name="displayTasks" 
      id="displayTasks" 
      onChange={(e) => setDisplayTasks(e.target.value)}
      className={styles.dropdown}
      >
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="week">This Week</option>
        <option value="all">All</option>
      </select>
    </nav>
  );
};
export default ToDoHeader;