import React, {useState} from 'react'
import TodoForm from './TodoForm'

function EditTodo(){
    const projects = [
        { id : 1, name : "personal", numOfTodos : 0 },
        { id : 2, name : "work", numOfTodos : 1 },
        { id : 3, name : "other", numOfTodos : 2 }
    ]

    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState(projects[0].name)

    function handleSubmit(e){
        e.preventDefault()
        // Add your submit logic here
    }

    return (
        <div className='EditTodo'>
            <div className="header">
                Edit Todo
            </div>
            <div className="container">
                <TodoForm
                    handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                />
            </div>
        </div>
    )
}

export default EditTodo