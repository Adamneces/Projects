import React from "react";
import styles from "./modules/ProjectsSidebar.module.css";

const ProjectsSidebar = ({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) => {
  return (
    <aside className={styles.aside}>
      <h2 className={styles.heading}>YOUR PROJECTS</h2>
      <div>
        <button onClick={onStartAddProject} className={styles.button}>
          + Add Project
        </button>
      </div>
      <ul className={styles.projectsContainer}>
        {projects.map((project) => {
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={
                  project.id === selectedProjectId
                    ? styles.selectedProject
                    : styles.projectsButton
                }
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProjectsSidebar;
