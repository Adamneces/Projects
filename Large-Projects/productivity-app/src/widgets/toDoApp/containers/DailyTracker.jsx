import React from 'react'
import styles from './DailyTracker.module.css'

const DailyTracker = ({toDos, isSameDay}) => {

  const today = new Date();
  const todaysTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    return isSameDay(taskDate, today);
  });
  const completedTasks = todaysTasks.filter((task) => task.taskIsDone);

  function filterPriority(tasks, priority){
    return tasks.filter((task) => task.priority === priority);
  }

  const progress = (completedTasks.length / todaysTasks.length) * 100

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <span>Today's tasks:</span>
        <span>{completedTasks.length}/{todaysTasks.length}</span>
      </div>
      <div className={styles.lineContainer}>
        <span>High Priority:</span>
        <span>{filterPriority(completedTasks, 'high').length}/{filterPriority(todaysTasks, 'high').length}</span>
      </div>
      <div className={styles.lineContainer}>
        <span>Medium Priority:</span>
        <span>{filterPriority(completedTasks, 'medium').length}/{filterPriority(todaysTasks, 'medium').length}</span>
      </div>
      <div className={styles.lineContainer}>
        <span>Low Priority:</span>
        <span>{filterPriority(completedTasks, 'low').length}/{filterPriority(todaysTasks, 'low').length}</span>
      </div>
      <div className={styles.lineContainer}>
        <span>No Priority:</span>
        <span>{filterPriority(completedTasks, 'nopriority').length}/{filterPriority(todaysTasks, 'nopriority').length}</span>
      </div>
      <div className={styles.progressContainer}>
        <div 
        className={`${styles.progressBar} ${progress > 99.9 ? styles.everythingCompleted : ''}`}
        style={{
          width: `${progress}%`,
          background:
          progress < 25
             ? 'red'
             : progress < 50
             ? 'orange'
             : progress < 75
             ? 'yellow'
             : 'green'
        }}
        ></div>
      </div>
    </div>
  )
}

export default DailyTracker
