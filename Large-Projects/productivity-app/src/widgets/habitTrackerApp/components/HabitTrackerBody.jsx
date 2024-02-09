import React from 'react';
import styles from './HabitTrackerBody.module.css';
import Habit from './bodyComponents/Habit';
import HabitForm from './bodyComponents/HabitForm.jsx'
import Checkbox from './bodyComponents/Checkbox.jsx';

const HabitTrackerBody = ({ habits, handleNewHabit }) => {
  return (
    <div className={styles.body}>
      {habits.map((habit) => {
        return (
          <Habit key={habit.name} name={habit.name} habits={habits}>
            {habit.trackHabitOn.map((day) => (
              <Checkbox
                key={day}
                className={styles.checkbox}
                day={day}
              />
            ))}
          </Habit>
        );
      })}
      <HabitForm handleNewHabit={handleNewHabit} />
    </div>
  );
};

export default HabitTrackerBody;