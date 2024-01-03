import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ToDoForm.module.css';

const ToDoForm = (props) => {
  const [newTask, setNewTask] = useState({
    task: '',
    description: '',
    time: '',
    color: '',
    priority: '',
    date: getTodayDate(), // Set initial date to today
    taskID: generateID(),
  });

  const [showForm, setShowForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createTheTask();
    setNewTask({
      task: '',
      description: '',
      time: '',
      color: '',
      priority: '',
      date: getTodayDate(), // Reset date to today after submission
      taskID: generateID(),
    });
    setShowForm(false);
  }

  function handleNewTaskChange(key, event) {
    setNewTask((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  }

  function createTheTask() {
    props.handleNewTask({
      ...newTask,
      taskID: generateID(),
    });
  }

  function generateID() {
    return uuidv4();
  }

  function getTodayDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }

  return (
    <>
      {showForm ? (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
            onChange={(event) => handleNewTaskChange('task', event)}
            name='task'
            type='text'
            value={newTask.task}
            required
            placeholder="What's the task?"
            maxLength={70}
            className={styles.input}
          />
          <textarea
            onChange={(event) => handleNewTaskChange('description', event)}
            name='description'
            type='text'
            value={newTask.description}
            placeholder='Description'
            maxLength={140}
          />
          <input
            onChange={(event) => handleNewTaskChange('time', event)}
            name='time'
            type='time'
            value={newTask.time}
          />
          <input
            type='date'
            onChange={(event) => handleNewTaskChange('date', event)}
            value={newTask.date}
          />

          <select
            onChange={(event) => handleNewTaskChange('color', event)}
            name='color'
            id='color'
            value={newTask.color}
          >
            <option value='green'>green</option>
            <option value='blue'>blue</option>
            <option value='red'>red</option>
          </select>

          <select
            onChange={(event) => handleNewTaskChange('priority', event)}
            name='priority'
            id='priority'
            value={newTask.priority}
          >
            <option value='high'>high</option>
            <option value='medium'>medium</option>
            <option value='low'>low</option>
          </select>

          <button type='submit'>submit</button>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}>Create a task</button>
      )}
    </>
  );
};

export default ToDoForm;