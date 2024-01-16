import React, { useState, useEffect } from 'react';
import ToDoTask from './ToDoBodyComponents/ToDoTask';

const ToDoBody = ({ toDos, setToDos, displayTasks }) => {

  return (
    <div>
      <ToDoTask 
      toDos={toDos} 
      setToDos={setToDos} 
      displayTasks={displayTasks}
      />
    </div>
  );
};

export default ToDoBody;