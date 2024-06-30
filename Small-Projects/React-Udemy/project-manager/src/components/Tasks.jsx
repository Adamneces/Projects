import React from "react";
import styles from "./modules/Tasks.module.css";
import NewTask from "./NewTask";

const Tasks = ({ onAdd, onDeleteTask, tasks }) => {
  return (
    <section>
      <h2 className={styles.heading}>Tasks</h2>
      <NewTask onAdd={onAdd}/>
      {tasks.length === 0 && <p className={styles.paragraph}>No tasks to complete...</p>}
      {tasks.length > 0 && (
        <ul className={styles.tasksContainer}>
          {tasks.map((task) => (
            <li
              className={styles.list}
              key={task.id}
            >
              <span style={{letterSpacing: '0.66px'}}>{task.text}</span>
              <button
                onClick={() => onDeleteTask(task.id)}
                className={styles.deleteBtn}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Tasks;
