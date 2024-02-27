import React from "react";
import styles from "../../HabitTrackerApp.module.css";

const Habit = ({ name, children, color }) => {
  return (
    <div
      style={{
        background: `linear-gradient(90deg, transparent, ${color} 35%)`,
      }}
      className={styles.habit_container}
    >
      <p className={styles.habit_habitName}>{name}</p>
      <div className={styles.habit_checkboxesContainer}>{children}</div>
    </div>
  );
};

export default Habit;
