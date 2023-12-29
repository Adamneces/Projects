import React, {useState} from 'react'
import ToDo from './containers/toDoContainer/ToDo'
import ToDoForm from './containers/toDoFormContainer/ToDoForm';

const ToDoApp = () => {
  const [toDos, setToDos] = useState([
    {
      task: 'nameOfTheTask',
      description: 'description',
      time: 'time',
      color: 'pickedColor',
      priority: 'high',
      taskID: 'will be a function to generate ID',
      isEditing: false
  }
  ]);

  function handleNewTask(task){
    setToDos((prev) => [...prev, task]);
  }

  return (
    <div>
      <ToDo toDos={toDos} setToDos={setToDos} />
      <ToDoForm handleNewTask={handleNewTask} />
    </div>
  )
}

export default ToDoApp
