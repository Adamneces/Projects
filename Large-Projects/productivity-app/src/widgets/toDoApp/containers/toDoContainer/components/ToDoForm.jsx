import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ToDoForm.module.css';
import backgroundColors from './utilities/backgroundColors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ToDoForm = (props) => {
  const [newTask, setNewTask] = useState({
    task: '',
    description: '',
    time: '',
    color: 'default',
    priority: 'nopriority',
    date: new Date(),
    taskID: generateID(),
  });
  const [showForm, setShowForm] = useState(false);
  const [color, setColor] = useState('rgb(44, 44, 44)');
  const [priority, setPriority] = useState('rgb(44, 44, 44)');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    createTheTask();
    setNewTask({
      task: '',
      description: '',
      time: '',
      color: 'default',
      priority: 'nopriority',
      date: getTodayDate(), // Reset date to today after submission
      taskID: generateID(),
    });
    setShowForm(false);
    setColor('rgb(44, 44, 44)');
    setPriority('rgb(44, 44, 44)');
    console.log(newTask);
  }

  function handleNewTaskChange(key, event) {
    setNewTask((prev) => ({
      ...prev,
      [key]: event.target.value
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
    return new Date();
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setNewTask((prev) => ({
      ...prev,
      date: date,  // Set the date as a Date object
    }));
    setShowCalendar(false);
  };
  return (
    <>
      {showForm ? (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
            onChange={(event) => handleNewTaskChange('task', event)}
            name='task'
            type='text'
            autoFocus
            value={newTask.task}
            required
            placeholder="What's the task?"
            maxLength={70}
            className={styles.firstInput}
          />
          <textarea
            className={styles.textarea}
            onChange={(event) => handleNewTaskChange('description', event)}
            name='description'
            type='text'
            value={newTask.description}
            placeholder='Description...'
            maxLength={140}setShowCalendar
          />
          <div className={styles.inputGroup}>
            <label htmlFor="time">Set time?</label>
            <input
              onChange={(event) => handleNewTaskChange('time', event)}
              name='time'
              type='time'
              value={newTask.time}
              className={styles.input}
              style={{ backgroundColor: 'rgb(44, 44, 44)' }}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="date">Set date?</label>
            <div className={styles.btnContainer}>
            <input
              className={styles.dateButton}
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              style={{ display: showCalendar ? 'none' : 'block' }}
              value={selectedDate ?
                (selectedDate.toDateString() === new Date().toDateString() ? 'Today' : selectedDate.toDateString())
                : 'Today'}
            />
            {showCalendar && (
            <DatePicker
            className={styles.datepicker} 
            selected={selectedDate} 
            onChange={handleDateChange} 
            minDate={new Date()}
            dateFormat="dd.MM"
            />
)}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="color">color:</label>
            <select
              onChange={(event) => handleNewTaskChange('color', event)}
              onClick={(e) => setColor(backgroundColors[e.target.value])}
              name='color'
              id='color'
              value={newTask.color}
              style={{ backgroundColor: color }}
              className={styles.input}
            >
              <option value="default">default</option>
              <option value='green'>green</option>
              <option value="yellow">yellow</option>
              <option value="purple">purple</option>
              <option value="turquoise">turquoise</option>
              <option value="brown">brown</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="priority">priority:</label>
            <select
            onChange={(event) => handleNewTaskChange('priority', event)}
            onClick={(e) => setPriority(backgroundColors[e.target.value])}
            name='priority'
            id='priority'
            value={newTask.priority}
            className={styles.input}
            style={{ border:`2px solid ${priority}`, backgroundColor: 'rgb(44, 44, 44)' }}
          >
            <option value="nopriority">doesn't matter</option>
            <option value='high'>high</option>
            <option value='medium'>medium</option>
            <option value='low'>low</option>
          </select>
          </div>
          
          <div className={styles.submit_closeButton_container}>
            <button 
              type='submit'
              className={styles.submitButton}
            >submit</button>
            <button
              onClick={() => setShowForm(false)}
              className={styles.formCloseButton}
            >
              close
            </button>
          </div>
        </form>
      ) : (
        <div 
        onClick={() => setShowForm(true)}
        className={styles.createTaskButtonContainer}>
          <FontAwesomeIcon icon={faPlus}  
            className={styles.createTaskButton}
          />
        </div>
      )}
    </>
  );
};

export default ToDoForm;