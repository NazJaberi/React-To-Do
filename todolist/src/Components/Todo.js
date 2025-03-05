import React, {useState} from 'react'
import { ArrowClockwise, CheckCircleFill, Circle, Trash} from 'react-bootstrap-icons'
import { db } from '../firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'  

function Todo({todo}){
    const [hover, setHover] = useState(false)

    const deleteTodo = async (todo) => {
        try {
            const todoRef = doc(db, 'todos', todo.id)
            await deleteDoc(todoRef)
        } catch (error) {
            console.error("Error deleting todo:", error)
            alert('Error deleting todo')
        }
    }

    const checkTodo = async (todo) => {
        try {
            // Add console.log to debug
            console.log('Current todo:', todo)
            console.log('Current checked status:', todo.checked)
            
            const todoRef = doc(db, 'todos', todo.id)
            
            // If checked is undefined, set it to true, otherwise toggle it
            const newCheckedStatus = todo.checked === undefined ? true : !todo.checked
            
            console.log('New checked status:', newCheckedStatus)
            
            await updateDoc(todoRef, {
                checked: newCheckedStatus
            })
        } catch (error) {
            console.error("Error updating todo:", error)
            console.error("Todo object:", todo)
            alert('Error updating todo')
        }
    }

    // Add console.log to verify todo object
    console.log('Rendering todo:', todo)

    return(
        <div className='Todo'>
            <div 
                className="todo-container"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div 
                    className="check-todo"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        checkTodo(todo)
                    }}
                >
                    {
                        todo.checked ?
                        <span className="checked">
                            <CheckCircleFill color="#bebebe" />
                        </span>
                        :
                        <span className="unchecked">
                            <Circle color={todo.color || '#000000'}/>
                        </span>
                    }
                </div>
                <div className="text">
                    <p style={{color : todo.checked ? '#bebebe' : '#000000'}}>
                        {todo.text}
                    </p>
                    <span>{todo.time} - {todo.projectName}</span>
                    <div className={`line ${todo.checked ? 'line-through' : ''}`}></div>
                </div>
                <div className="add-to-next-day">
                    {
                        todo.checked &&
                        <span>
                            <ArrowClockwise />
                        </span>
                    }
                </div>
                <div 
                    className="delete-todo"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteTodo(todo)
                    }}
                >
                    {
                        (hover || todo.checked) &&
                        <span>
                            <Trash />
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo