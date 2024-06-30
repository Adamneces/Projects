import React from "react";
import styles from "./modules/SelectedProject.module.css";
import Tasks from "./Tasks";

const SelectedProject = ({
  tasks,
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
}) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.mainHeading}>
          <h1 className={styles.title}>{project.title}</h1>
          <button onClick={onDelete} className={styles.button}>
            Delete
          </button>
        </div>
        <p className={styles.paragraphOne}>{formattedDate}</p>
        <p className={styles.paragraphTwo}>{project.description}</p>
      </header>
      <Tasks tasks={tasks} onAdd={onAddTask} onDeleteTask={onDeleteTask} />
    </div>
  );
};

export default SelectedProject;
