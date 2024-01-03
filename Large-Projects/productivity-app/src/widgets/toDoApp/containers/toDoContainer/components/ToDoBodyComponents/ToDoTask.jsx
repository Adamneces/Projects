import React, { useState, useEffect } from 'react';
import styles from "./ToDoTask.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons'


const ToDoTask = ({ toDos, setToDos }) => {
  const [editedTasks, setEditedTasks] = useState([]);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

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
      {toDos.map((task, index) => (
        <div className={task.isEditing ? styles.taskContainerEditing : styles.taskContainer} key={task.taskID}>
          <button disabled={task.taskIsDone} onClick={() => handleFinishTask(index)}>O</button>
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
            <p className={task.taskIsDone ? styles.taskIsDone : styles.task}>{task.task}</p>
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
                {task.isEditing ? 'save' : <FontAwesomeIcon icon={faPenToSquare} className={styles.editIcon} />}
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