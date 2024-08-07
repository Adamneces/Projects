import React, {useState, useEffect, useRef} from 'react'

function ToDoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

    function handleChange(event){
        setInput(event.target.value);
    }

    function handleSubmit(event){
        event.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        setInput('');
    };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
            <input 
            type="text" 
            placeholder='Update your task' 
            value={input} 
            name='text' 
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
        />
        <button className='todo-button edit'>Update</button>
        </>
        ): (
            <>
            <input 
            type="text" 
            placeholder='Add a task' 
            value={input} 
            name='text' 
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
        />
        <button className='todo-button'>Add a task</button>
        </>
        )}

    </form>
  )
}

export default ToDoForm
