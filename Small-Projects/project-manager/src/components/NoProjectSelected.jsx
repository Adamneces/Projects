import React from "react";
import styles from "./modules/NoProjectSelected.module.css";
import noProject from "../assets/no-projects.png";

const NoProjectSelected = ({ onStartAddProject }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={noProject} alt="empty tasks list" />
      <h2 className={styles.heading}>No Project Selected</h2>
      <p className={styles.paragraph}>
        Select a project or get started with a new one
      </p>
      <p className={styles.buttonWrapper}>
        <button onClick={onStartAddProject} className={styles.button}>
          Create new Project
        </button>
      </p>
    </div>
  );
};

export default NoProjectSelected;
