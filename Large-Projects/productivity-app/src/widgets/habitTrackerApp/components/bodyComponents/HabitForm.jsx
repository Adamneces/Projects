import React from "react";
import styles from "./HabitForm.module.css";

const HabitForm = () => {
  return (
    <div>
      <form className={styles.form}>
        <input type="text" name="name" placeholder="Name of the Habit" />
        <textarea name="description" placeholder="Description" />
      </form>
    </div>
  );
};

export default HabitForm;
