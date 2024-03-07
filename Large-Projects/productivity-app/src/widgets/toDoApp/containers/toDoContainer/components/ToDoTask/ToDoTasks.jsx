import { useState, useEffect, useContext } from "react";
import styles from "../../ToDo.module.css";
import {
  isWithinWeek,
  isSameDay,
  parseDate,
} from "../../../../utilities/utilities";
import ToDoContext from "../../store/ToDoContext";
import Task from "./Task";

const ToDoTask = ({ toDos, setToDos }) => {
  const { displayTasks, filterTasks } = useContext(ToDoContext);

  const [editedTasks, setEditedTasks] = useState([]);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  function sortByPriorityAndStatus(taskA, taskB) {
    const priorityOrder = ["high", "medium", "low", "nopriority"];
    const priorityA = priorityOrder.indexOf(taskA.priority);
    const priorityB = priorityOrder.indexOf(taskB.priority);

    if (filterTasks === "priority") {
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
    } else if (filterTasks === "time") {
      const timeA = taskA.time
        ? new Date(`2000-01-01T${taskA.time}`)
        : new Date("2000-01-01T23:59");
      const timeB = taskB.time
        ? new Date(`2000-01-01T${taskB.time}`)
        : new Date("2000-01-01T23:59");
      return timeA - timeB;
    }
    return taskA.taskIsDone - taskB.taskIsDone;
  }

  const sortedToDos = toDos.sort(sortByPriorityAndStatus);
  const filteredTasks = filterTasksByDate(displayTasks);

  useEffect(() => {
    setEditedTasks(toDos.map((task) => task.task));
  }, [toDos]);

  function filterTasksByDate(displayTasks) {
    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + (7 - today.getDay()));

    const firstDay = new Date(today);
    firstDay.setDate(today.getDate() - today.getDay());

    switch (displayTasks) {
      case "today":
        return sortedToDos.filter((task) =>
          isSameDay(parseDate(task.date), today)
        );
      case "tomorrow":
        return sortedToDos.filter((task) =>
          isSameDay(parseDate(task.date), tomorrow)
        );
      case "week":
        return sortedToDos.filter((task) =>
          isWithinWeek(parseDate(task.date), firstDay, lastDay)
        );
      case "all":
        return sortedToDos;
      default:
        return sortedToDos;
    }
  }

  function handleDeleteTask(task) {
    setToDos((prev) => prev.filter((todo) => todo.taskID !== task.taskID));
  }
  function handleIsEditing(index) {
    setToDos((prev) => {
      return prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isEditing: !todo.isEditing };
        } else if (todo.isEditing) {
          return { ...todo, isEditing: false };
        }
        return todo;
      });
    });
    setEditedTaskIndex(index);
  }

  function handleEditTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].task = editedTasks[index];
      return updatedToDos;
    });
    handleIsEditing(index);
    setEditedTaskIndex(null);
  }

  function handleFinishTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].taskIsDone = !updatedToDos[index].taskIsDone;
      return updatedToDos;
    });
  }

  return (
    <ul className={styles.toDoTask_tasksContainer}>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <Task
            handleEditTask={handleEditTask}
            handleIsEditing={handleIsEditing}
            handleDeleteTask={handleDeleteTask}
            setEditedTasks={setEditedTasks}
            editedTasks={editedTasks}
            setEditedTaskIndex={setEditedTaskIndex}
            editedTaskIndex={editedTaskIndex}
            handleFinishTask={handleFinishTask}
            task={task}
            index={index}
          />
        ))
      ) : (
        <h3 className={styles.toDoTask_noTasksHeading}>
          Click on the '+' icon to add tasks!
        </h3>
      )}
    </ul>
  );
};

export default ToDoTask;
