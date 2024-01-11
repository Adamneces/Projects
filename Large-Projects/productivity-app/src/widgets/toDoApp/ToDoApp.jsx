import React, {useState} from 'react'
import ToDo from './containers/toDoContainer/ToDo'


const ToDoApp = () => {
  const [toDos, setToDos] = useState([
    {
      task: 'My first task',
      description: 'description',
      time: 'time',
      color: 'default',
      priority: 'high',
      taskID: 'will be a function to generate ID',
      isEditing: false,
      taskIsDone: false
  }
  ]);

  return (
    <div>
      <ToDo toDos={toDos} setToDos={setToDos} />
    </div>
  )
}

export default ToDoApp
