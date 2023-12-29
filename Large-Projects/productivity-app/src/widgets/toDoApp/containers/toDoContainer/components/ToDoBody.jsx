import React, { useState, useEffect } from 'react';

const ToDoBody = ({ toDos, setToDos }) => {
  const [editedTasks, setEditedTasks] = useState([]);

  // Initialize editedTasks when the component mounts or when toDos changes
  useEffect(() => {
    setEditedTasks(toDos.map(task => task.task));
  }, [toDos]);

  function handleDeleteTask(task) {
    setToDos((prev) => prev.filter((todo) => todo.taskID !== task.taskID));
  }

  function handleIsEditing(index) {
    setToDos((prev) => {
      return prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      });
    });
  }

  function handleEditTask(index) {
    setToDos((prev) => {
      const updatedToDos = [...prev];
      updatedToDos[index].task = editedTasks[index];
      return updatedToDos;
    });
    handleIsEditing(index);
  }

  return (
    <div>
      <ul>
        {toDos.map((task, index) => (
          <div style={{ display: 'flex' }} key={task.taskID}>
            {task.isEditing ? (
              <input
                type='text'
                value={editedTasks[index]}
                onChange={(e) => {
                  const newEditedTasks = [...editedTasks];
                  newEditedTasks[index] = e.target.value;
                  setEditedTasks(newEditedTasks);
                }}
              />
            ) : (
              <li>{task.task}</li>
            )}
            <button onClick={() => (task.isEditing ? handleEditTask(index) : handleIsEditing(index))}>
              {task.isEditing ? 'save' : 'edit'}
            </button>
            <button onClick={() => handleDeleteTask(task)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ToDoBody;