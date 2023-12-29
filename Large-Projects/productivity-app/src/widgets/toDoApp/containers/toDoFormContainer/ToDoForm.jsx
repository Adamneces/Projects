import React, {useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

const ToDoForm = (props) => {
    const [newTask, setNewTask] = useState({
        task: '',
        description: '',
        time: '',
        color: '',
        priority: '',
        taskID: generateID()
    });

    function handleSubmit(e){
        e.preventDefault();
        createTheTask();
        setNewTask({
          task: '',
          description: '',
          time: '',
          color: '',
          priority: '',
          taskID: generateID()
        });
    }

    function handleNewTaskChange(key, event) {
        setNewTask((prev) => ({
            ...prev,
            [key]: event.target.value
        }));
    }

    function createTheTask(){
        props.handleNewTask({
          ...newTask,
            taskID: generateID(),
        });
    }

    function generateID(){
      return uuidv4();
    }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={(event) => handleNewTaskChange('task', event)} name='task' type="text" value={newTask.task}/>
      <input onChange={(event) => handleNewTaskChange('description', event)} name='description' type='text' value={newTask.description}/>
      <input onChange={(event) => handleNewTaskChange('time', event)} name='time' type='time' value={newTask.time}/>

      <select onChange={(event) => handleNewTaskChange('color', event)} name="color" id="color" value={newTask.color}>
        <option value="green">green</option>
        <option value="blue">blue</option>
        <option value="red">red</option>
      </select>

      <select onChange={(event) => handleNewTaskChange('priority', event)} name="priority" id="priority" value={newTask.priority}>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>

      <button type='submit'>submit</button>
    </form>
  )
}

export default ToDoForm
