import React from 'react'
import Input from './Input'
import styles from './NewProjects.module.css'

const NewProjects = () => {
  return (
    <div className={styles.container}>
      <menu className={styles.menu}>
        <li><button className={styles.cancelBtn}>Cancel</button></li>
        <li><button className={styles.saveBtn}>Save</button></li>
      </menu>
      <div>
       <Input label="Title" />
       <Input label="Description" isTextarea/>
       <Input label="Due Date" />
      </div>
    </div>
  )
}

export default NewProjects
