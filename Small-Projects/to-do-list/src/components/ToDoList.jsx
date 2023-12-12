import React, {useState} from 'react';
import ToDoForm from './ToDoForm';
import Todo from './Todo';

function ToDoList() {
    const [todos, setTodos] = useState([]);

    function addTodo(todo){
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos);
        
    }
    function updateTodo(todoId, newValue){
        if(!newValue.text || /^\s*$/.test(newValue.text)){
            return
        }

        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
    }


    function removeTodo(id){
        const removeArr = [...todos].filter(todo => todo.id !== id);

        setTodos(removeArr);
    }

    function completeTodo(id){
        let updatedTodos = todos.map(todo => {
            if (todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        });
        setTodos(updatedTodos)
    }

  return (
    <div>
      <h1>TO DO LIST</h1>
      <ToDoForm onSubmit={addTodo}/>
      <Todo 
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  )
}

export default ToDoList;
