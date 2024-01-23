import React from 'react'
import styles from './Tracker.module.css'

const Tracker = ({toDos}) => {

const today = new Date();
const completedTasks = toDos.filter((task) => task.taskIsDone);

const lastDay = new Date(today);
lastDay.setDate(today.getDate() + (7 - today.getDay()));
const firstDay = new Date(today);
firstDay.setDate(today.getDate() - today.getDay() + 1);

const todaysTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    return isSameDay(taskDate, today);
  });
  const todaysTasksCompleted = todaysTasks.filter((task) => task.taskIsDone);

  const tomorrowTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(taskDate, tomorrow);
  });
  const tomorrowsTasksCompleted = tomorrowTasks.filter((task) => task.taskIsDone);

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

      const withinWeekTasks = toDos.filter((task) => isWithinWeek(parseDate(task.date), firstDay, lastDay)); 
      const withinWeekTasksCompleted = withinWeekTasks.filter((task) => task.taskIsDone);
      const progressPercentage = (completedTasks.length / toDos.length) * 100

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.trackerLineContainer} style={{marginBottom: '10px'}}>
        <span style={{fontSize: '19px'}}>Tasks Completed:</span>
        <span style={{fontSize: '19px'}}>{completedTasks.length}/{toDos.length}</span>
      </div>
      <div className={styles.trackerLineContainer}>
        <span>For today:</span>
        <span>{todaysTasksCompleted.length}/{todaysTasks.length}</span>
      </div>
      <div className={styles.trackerLineContainer}>
        <span>For tomorrow:</span>
        <span>{tomorrowsTasksCompleted.length}/{tomorrowTasks.length}</span>
      </div>
      <div className={styles.trackerLineContainer}>
        <span>This week:</span>
        <span>{withinWeekTasksCompleted.length}/{withinWeekTasks.length}</span>
      </div>
      <div className={styles.trackerLineContainer}>
        <span>Progress:</span>
        <span>{progressPercentage ? progressPercentage+'%': '0'}</span>
      </div>
      <div className={styles.progressBarContainer}>
      <div
       className={`${styles.progressBar} ${progressPercentage === 100 ? styles.animateComplete : ''}`}
       style={{
         width: `${progressPercentage}%`,
         background:
           progressPercentage < 25
             ? 'red'
             : progressPercentage < 50
             ? 'orange'
             : progressPercentage < 75
             ? 'yellow'
             : 'green'
    }}
  ></div>
      </div>
    </div>
  )
}

export default Tracker
