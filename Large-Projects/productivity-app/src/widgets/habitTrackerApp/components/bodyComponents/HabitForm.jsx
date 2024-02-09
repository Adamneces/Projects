import React, { useState, useRef } from "react";
import styles from "./HabitForm.module.css";
import DayCheckbox from "./DayCheckbox";

const HabitForm = ({ handleNewHabit }) => {
  const dialog = useRef();
  const [habit, setHabit] = useState({
    name: "",
    trackHabitOn: [],
    description: "",
  });

  function handleSubmit(event) {
    if (habit.trackHabitOn.length === 0) {
      dialog.current.showModal();
      event.preventDefault();
      return;
    }
    event.preventDefault();
    handleNewHabit(habit);

    // Reset the form fields and checkboxes
    setHabit({
      name: "",
      trackHabitOn: [],
      description: "",
    });
  }

  function handleHabitChange(part, e) {
    setHabit({
      ...habit,
      [part]: e.target.value,
    });
  }

  function handleDayCheckboxChange(day, isChecked) {
    if (isChecked) {
      setHabit((prevHabit) => ({
        ...prevHabit,
        trackHabitOn: [...prevHabit.trackHabitOn, day],
      }));
    } else {
      setHabit((prevHabit) => ({
        ...prevHabit,
        trackHabitOn: prevHabit.trackHabitOn.filter((d) => d !== day),
      }));
    }
  }

  function handleCloseDialog() {
    dialog.current.close();
  }

  return (
    <div>
      <dialog className={styles.dialog} ref={dialog}>
        <p>Please select at least one day</p>
        <button className={styles.dialogBtn} onClick={handleCloseDialog}>
          Close
        </button>
      </dialog>
      <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
        <input
          required
          onChange={(e) => handleHabitChange("name", e)}
          type="text"
          name="name"
          placeholder="Name of the Habit"
          value={habit.name}
        />
        <textarea
          onChange={(e) => handleHabitChange("description", e)}
          name="description"
          placeholder="Description"
          value={habit.description}
        />
        <div className={styles.daysContainer}>
          <div className={styles.individualDaysContainer}>
            <DayCheckbox
              label="Monday"
              value="mo"
              onChange={(isChecked) => handleDayCheckboxChange("mo", isChecked)}
              checked={habit.trackHabitOn.includes("mo")}
            />
            <DayCheckbox
              label="Tuesday"
              value="tu"
              onChange={(isChecked) => handleDayCheckboxChange("tu", isChecked)}
              checked={habit.trackHabitOn.includes("tu")}
            />
            <DayCheckbox
              label="Wednesday"
              value="we"
              onChange={(isChecked) => handleDayCheckboxChange("we", isChecked)}
              checked={habit.trackHabitOn.includes("we")}
            />
            <DayCheckbox
              label="Thursday"
              value="th"
              onChange={(isChecked) => handleDayCheckboxChange("th", isChecked)}
              checked={habit.trackHabitOn.includes("th")}
            />
          </div>
          <div className={styles.individualDaysContainer}>
            <DayCheckbox
              label="Friday"
              value="fr"
              onChange={(isChecked) => handleDayCheckboxChange("fr", isChecked)}
              checked={habit.trackHabitOn.includes("fr")}
            />
            <DayCheckbox
              label="Saturday"
              value="sa"
              onChange={(isChecked) => handleDayCheckboxChange("sa", isChecked)}
              checked={habit.trackHabitOn.includes("sa")}
            />
            <DayCheckbox
              label="Sunday"
              value="su"
              onChange={(isChecked) => handleDayCheckboxChange("su", isChecked)}
              checked={habit.trackHabitOn.includes("su")}
            />
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default HabitForm;
