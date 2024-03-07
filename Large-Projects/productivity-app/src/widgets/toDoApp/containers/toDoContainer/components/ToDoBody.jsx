import ToDoTasks from "./ToDoTask/ToDoTasks";
import styles from "../ToDo.module.css";

import { useContext } from "react";
import ToDoContext from "../store/ToDoContext";

const ToDoBody = ({ toDos, setToDos }) => {
  const { displayTasks, filterTasks } = useContext(ToDoContext);

  return (
    <div className={styles.toDoBody_tasksContainer}>
      <ToDoTasks
        filterTasks={filterTasks}
        toDos={toDos}
        setToDos={setToDos}
        displayTasks={displayTasks}
      />
    </div>
  );
};

export default ToDoBody;
