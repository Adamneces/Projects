import React, { useState, useEffect } from 'react';
import backgroundColors from '../utilities/backgroundColors';
import styles from "./ToDoTask.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faRotateLeft, faDownload } from '@fortawesome/free-solid-svg-icons'


const ToDoTask = ({ toDos, setToDos }) => {
  const [editedTasks, setEditedTasks] = useState([]);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

  function sortByPriority(taskA, taskB){
    const priorityOrder = ['high', 'medium', 'low', 'nopriority'];
    const priorityA = priorityOrder.indexOf(taskA.priority);
    const priorityB = priorityOrder.indexOf(taskB.priority);

    return priorityA - priorityB; 
  };

  const sortedToDos = toDos.sort(sortByPriority);

  useEffect(() => {
    setEditedTasks(toDos.map((task) => task.task));
  }, [toDos]);

  function handleDeleteTask(task) {
    setToDos((prev) => prev.filter((todo) => todo.taskID !== task.taskID));
  }

  function handleIsEditing(index) {
    setToDos((prev) => {
      return prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
    });
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
      {sortedToDos.map((task, index) => (
        <div 
        className={task.isEditing ? styles.taskContainerEditing : styles.taskContainer} 
        key={task.taskID}
        style={{background: backgroundColors[`task${task.color}`], borderLeft: !task.isEditing && `4px solid ${backgroundColors[task.priority]}`}}
        >
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
            <p className={styles.priorityText} >{task.priority !== 'nopriority' ? task.priority : ''}</p>
            </div>
          )}
          {task.taskIsDone ? (
           <FontAwesomeIcon 
           icon={faRotateLeft} 
           className={styles.deleteIcon}
           onClick={() => handleFinishTask(index)}/>
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
      ))}
    </ul>
  );
};

export default ToDoTask;