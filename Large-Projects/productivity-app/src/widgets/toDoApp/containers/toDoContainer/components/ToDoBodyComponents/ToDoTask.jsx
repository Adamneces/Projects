import React, { useState, useEffect } from 'react';
import backgroundColors from '../utilities/backgroundColors';
import styles from "./ToDoTask.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faRotateLeft, faDownload } from '@fortawesome/free-solid-svg-icons'


const ToDoTask = ({ toDos, setToDos, displayTasks, filterTasks }) => {
  const [editedTasks, setEditedTasks] = useState([]);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  
  function sortByPriorityAndStatus(taskA, taskB) {
    const priorityOrder = ['high', 'medium', 'low', 'nopriority'];
    const priorityA = priorityOrder.indexOf(taskA.priority);
    const priorityB = priorityOrder.indexOf(taskB.priority);
  
    if (filterTasks === 'priority') {
      // Compare by priority
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
    } else if (filterTasks === 'time') {
      // Compare by time
      const timeA = taskA.time ? new Date(`2000-01-01T${taskA.time}`) : new Date('2000-01-01T23:59');
      const timeB = taskB.time ? new Date(`2000-01-01T${taskB.time}`) : new Date('2000-01-01T23:59');
      return timeA - timeB;
    }

    return taskA.taskIsDone - taskB.taskIsDone;
  }
  
  const sortedToDos = toDos.sort(sortByPriorityAndStatus);
  const filteredTasks = filterTasksByDate(displayTasks);
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    setEditedTasks(toDos.map((task) => task.task));
  }, [toDos]);

  function formatDate(task){
    return task.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  }

  function filterTasksByDate(displayTasks) {
    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + (7 - today.getDay()));
  
    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay() + 1);
  
    switch (displayTasks) {
      case 'today':
        return sortedToDos.filter((task) => isSameDay(parseDate(task.date), today)); 
      case 'tomorrow':
        return sortedToDos.filter((task) => isSameDay(parseDate(task.date), tomorrow));  
      case 'week':
        return sortedToDos.filter((task) => isWithinWeek(parseDate(task.date), firstDay, lastDay)); 
      case 'all':
        return sortedToDos;
      default:
        return sortedToDos;
    }
  }
  function parseDate(date) {
    // Check if date is already a Date object
    return date instanceof Date ? date : new Date(date);
  }
  function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  function isWithinWeek(date, startOfWeek, endOfWeek) {
    return date >= startOfWeek && date <= endOfWeek;
  }
  function handleDeleteTask(task) {
    setToDos((prev) => prev.filter((todo) => todo.taskID !== task.taskID));
  }
  function handleIsEditing(index) {
    setToDos((prev) => {
      return prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isEditing: !todo.isEditing };
        } else if (todo.isEditing) {
          // Reset isEditing for the previously edited task
          return { ...todo, isEditing: false };
        }
        return todo;
      });
    });
    setEditedTaskIndex(index); // Set the index after updating isEditing
  }
  
  function handleEditTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].task = editedTasks[index];
      return updatedToDos;
    });
    handleIsEditing(index);
    setEditedTaskIndex(null);
  }

  function handleFinishTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].taskIsDone = !updatedToDos[index].taskIsDone;
      return updatedToDos;
    });
  }

  return (
    <ul className={styles.tasksContainer}>
      {filteredTasks.map((task, index) => (
        <div 
        className={task.isEditing ? styles.taskContainerEditing : styles.taskContainer} 
        key={task.taskID}
        style={{background: `linear-gradient(90deg, transparent 0%, ${backgroundColors[`task${task.color}`]} 15%)`, borderLeft: !task.isEditing && `4px solid ${backgroundColors[task.priority]}`}}
        >
          <div className={styles.taskMainTextContainer}>
          <input
           className={styles.checkboxInput}
           type='checkbox'
           checked={task.taskIsDone}
           disabled={task.taskIsDone} 
           onClick={() => handleFinishTask(index)} 
           />
          {task.isEditing ? (
            <input
              autoFocus={editedTaskIndex === index}
              className={styles.input}
              type='text'
              value={editedTasks[index]}
              onChange={(e) => {
                const newEditedTasks = [...editedTasks];
                newEditedTasks[index] = e.target.value;
                setEditedTasks(newEditedTasks);
              }}
            />
          ) : (
            <div className={styles.taskParagraphContainer}>
            <p className={task.taskIsDone ? styles.taskIsDone : styles.task}>{task.task}</p>
            {task.taskIsDone ? null : <p className={styles.priorityText} >{task.priority !== 'nopriority' ? task.priority : ''}</p>}
            </div>
          )}
          {task.taskIsDone ? (
            <div>
           <FontAwesomeIcon 
           icon={faRotateLeft} 
           className={styles.deleteIcon}
           onClick={() => handleFinishTask(index)}/>
           <button onClick={() => handleDeleteTask(task)}><FontAwesomeIcon icon={faTrash} className={styles.deleteIcon}/></button>
           </div>
          ) : (
            <>
              <button
                onClick={() => {
                  if (task.isEditing) {
                    handleEditTask(index);
                  } else {
                    handleIsEditing(index);
                    setEditedTaskIndex(index);
                  }
                }}
              >
                {task.isEditing ? <FontAwesomeIcon icon={faDownload} className={styles.editIcon}/> : <FontAwesomeIcon icon={faPenToSquare} className={styles.editIcon} />}
              </button>
              <button onClick={() => handleDeleteTask(task)}><FontAwesomeIcon icon={faTrash} className={styles.deleteIcon}/></button>
            </>
          )}
          </div>
          {!task.taskIsDone && !task.isEditing && (
        <div className={styles.taskAdditionalTextContainer}>
          <p>
            {formatDate(task.date) === formatDate(today)
              ? 'today'
              : formatDate(task.date) === formatDate(tomorrow)
              ? 'tomorrow'
              : formatDate(task.date)}
          </p>
          <p>{task.time}</p>
        </div>
)}
        </div>
      ))}
    </ul>
  );
};

export default ToDoTask;