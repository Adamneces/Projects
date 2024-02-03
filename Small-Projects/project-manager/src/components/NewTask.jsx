import React, { useState } from "react";
import styles from "./modules/NewTask.module.css";

const NewTask = ({onAdd}) => {
  const [enteredTask, setEnteredTask] = useState('');

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask){
        onAdd(enteredTask);
        setEnteredTask('');
    }
  }

  return (
    <div className={styles.container}>
      <input
        value={enteredTask}
        onChange={handleChange}
        className={styles.input}
        type="text"
      />
      <button onClick={handleClick} className={styles.button}>Add Task</button>
    </div>
  );
};

export default NewTask;
