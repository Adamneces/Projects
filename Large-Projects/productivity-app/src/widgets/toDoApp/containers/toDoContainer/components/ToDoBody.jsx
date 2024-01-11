import React, { useState, useEffect } from 'react';
import ToDoTask from './ToDoBodyComponents/ToDoTask';

const ToDoBody = ({ toDos, setToDos }) => {

  return (
    <div>
      <ToDoTask 
      toDos={toDos} 
      setToDos={setToDos} 
      />
    </div>
  );
};

export default ToDoBody;