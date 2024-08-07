import React, {useState} from 'react'
import ToDoForm from './ToDoForm'
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";



function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        values: ''
    });

    function submitUpdate(value){
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id){
        return <ToDoForm edit={edit} onSubmit={submitUpdate} />
    }

  return todos.map((todo, index) => (
    <div 
    className={todo.isComplete ? 'todo-row complete' : 'todo-row'} 
    key={index}>
        <div key={todo.id} onClick={() => completeTodo()}>
            {todo.text}
        </div>
        <div className='icons'>
        <IoCloseCircleOutline
        onClick={() => removeTodo(todo.id)}
        className='delete-icon' 
        />
        <MdEdit 
        onClick={() => setEdit({ id: todo.id, value: todo.text})}
        className='edit-icon' 
        />
        </div>
    </div>
  ))
}

export default Todo
