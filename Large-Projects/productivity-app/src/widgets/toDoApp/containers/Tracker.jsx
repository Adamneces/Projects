import React from "react";
import styles from "../ToDoApp.module.css";
import TrackingBar from "../UI/TrackingBar";
import { isWithinWeek, isSameDay, parseDate } from "../utilities/utilities";

const Tracker = ({ toDos }) => {
  const today = new Date();
  const completedTasks = toDos.filter((task) => task.taskIsDone);

  const lastDay = new Date(today);
  lastDay.setDate(today.getDate() + (7 - today.getDay()));
  const firstDay = new Date(today);
  firstDay.setDate(today.getDate() - today.getDay());

  const todaysTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    return isSameDay(taskDate, today);
  });
  const todaysTasksCompleted = todaysTasks.filter((task) => task.taskIsDone);

  const tomorrowTasks = toDos.filter((task) => {
    const taskDate = new Date(task.date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(taskDate, tomorrow);
  });
  const tomorrowsTasksCompleted = tomorrowTasks.filter(
    (task) => task.taskIsDone
  );

  const withinWeekTasks = toDos.filter((task) =>
    isWithinWeek(parseDate(task.date), firstDay, lastDay)
  );
  const withinWeekTasksCompleted = withinWeekTasks.filter(
    (task) => task.taskIsDone
  );
  const progressPercentage = (
    (completedTasks.length / toDos.length) *
    100
  ).toFixed(1);

  return (
    <div className={styles.tracker_trackerContainer}>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"Tasks Completed:"} fontSize={"19px"} margin={"20px"}>
        {completedTasks.length}/{toDos.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"For today:"}>
        {todaysTasksCompleted.length}/{todaysTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"For tomorrow:"}>
        {tomorrowsTasksCompleted.length}/{tomorrowTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label={"This week:"}>
        {withinWeekTasksCompleted.length}/{withinWeekTasks.length}
      </TrackingBar>
      <TrackingBar className={styles.tracker_trackerLineContainer} label="Progress">
        {progressPercentage > 0 ? progressPercentage + "%" : "0"}
      </TrackingBar>
      <div className={styles.tracker_progressBarContainer}>
        <div
          className={`${styles.tracker_progressBar} ${
            progressPercentage > 99.9 ? styles.tracker_animateComplete : ""
          }`}
          style={{
            width: `${progressPercentage > 0 ? progressPercentage : "0"}%`,
            background:
              progressPercentage < 25
                ? "red"
                : progressPercentage < 50
                ? "orange"
                : progressPercentage < 75
                ? "yellow"
                : "green",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Tracker;
