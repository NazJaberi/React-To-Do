import React, { useContext, useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Modal from './Modal'
import {TodoContext} from '../contex'
import {calendarItems} from '../constants'
import {db} from '../firebase'
import moment from 'moment'
import randomColor from 'randomcolor'
import { collection, addDoc } from 'firebase/firestore'

function AddNewTodo(){
    const {projects, selectedProject} = useContext(TodoContext)
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState(selectedProject)
    
    async function handleSubmit(e){
        e.preventDefault()

        // Changed this line to check if the todoProject is NOT in calendarItems
        if (text && !calendarItems.includes(todoProject)){
            try {
                await addDoc(collection(db, 'todos'), {
                    text: text,
                    date: moment(day).format('DD/MM/YYYY'),
                    day: moment(day).format('d'),
                    time: moment(time).format('hh:mm A'),
                    checked: false,
                    color: randomColor(),
                    projectName: todoProject,
                })
                setShowModal(false)
                setText('')
                setDay(new Date())
                setTime(new Date())
            } catch (error) {
                console.error("Error adding document: ", error)
            }
        }
    }

    useEffect( () => {
        setTodoProject(selectedProject)
    }, [selectedProject])

    return(
        <div className='AddNewTodo'>
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <TodoForm 
                    handleSubmit={handleSubmit}
                    heading='Add new to do!'
                    text={text}
                    setText={setText}
                    day={day}
                    setDay={setDay}
                    time={time}
                    setTime={setTime}
                    todoProject={todoProject}
                    setTodoProject={setTodoProject}
                    projects={projects}
                    showButtons={true}
                    setShowModal={setShowModal}
                />
            </Modal>
        </div>
    )
}

export default AddNewTodo