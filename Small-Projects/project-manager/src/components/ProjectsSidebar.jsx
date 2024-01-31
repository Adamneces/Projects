import React from 'react'
import styles from './ProjectsSidebar.module.css'

const ProjectsSidebar = () => {
  return (
    <aside className={styles.aside}>
        <h2 className={styles.heading}>YOUR PROJECTS</h2>
        <div>
            <button className={styles.button}>
               + Add Project
            </button>
        </div>
        <ul>
            
        </ul>
    </aside>
  )
}

export default ProjectsSidebar
