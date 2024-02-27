import ToDoTask from './ToDoBodyComponents/ToDoTask';
import styles from '../ToDo.module.css';

const ToDoBody = ({ toDos, setToDos, displayTasks, filterTasks }) => {

  return (
    <div className={styles.toDoBody_tasksContainer}>
      <ToDoTask 
      filterTasks={filterTasks}
      toDos={toDos} 
      setToDos={setToDos} 
      displayTasks={displayTasks}
      />
    </div>
  );
};

export default ToDoBody;