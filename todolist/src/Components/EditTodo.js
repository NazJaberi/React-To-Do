import React, {useState, useContext, useEffect} from 'react'
import TodoForm from './TodoForm'
import { TodoContext } from '../contex'
import moment from 'moment'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'

function EditTodo(){
    const {selectedTodo, projects} = useContext(TodoContext)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState('')
    const [updateTimer, setUpdateTimer] = useState(null)

    // Set initial values when selectedTodo changes
    useEffect(() => {
        if(selectedTodo){
            setText(selectedTodo.text)
            setDay(moment(selectedTodo.date, 'MM/DD/YYYY'))
            setTime(moment(selectedTodo.time, 'hh:mm A'))
            setTodoProject(selectedTodo.projectName)
        }
    }, [selectedTodo])

    // Update todo with debounce
    useEffect(() => {
        const updateTodo = async () => {
            if(selectedTodo && text.trim() !== ''){
                try {
                    const todoRef = doc(db, 'todos', selectedTodo.id)
                    await updateDoc(todoRef, {
                        text,
                        date: moment(day).format('MM/DD/YYYY'),
                        day: moment(day).format('d'),
                        time: moment(time).format('hh:mm A'),
                        projectName: todoProject,
                    })
                } catch (error) {
                    console.error("Error updating todo:", error)
                }
            }
        }

        // Clear any existing timer
        if(updateTimer) {
            clearTimeout(updateTimer)
        }

        // Set new timer
        const newTimer = setTimeout(() => {
            updateTodo()
        }, 500) // 500ms delay

        setUpdateTimer(newTimer)

        // Cleanup
        return () => {
            if(updateTimer) {
                clearTimeout(updateTimer)
            }
        }
    }, [text, day, time, todoProject, selectedTodo])

    function handleSubmit(e){
        e.preventDefault()
    }

    return (
        <div>
            {
                selectedTodo &&
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
            }
        </div>
    )
}

export default EditTodo