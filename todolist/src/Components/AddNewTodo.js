import React, { useContext, useState } from 'react';
import TodoForm from './TodoForm';
import Modal from './Modal'
import {TodoContext} from '../contex'

function AddNewTodo(){

    const {selectedProject} = useContext(TodoContext)
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [todoProject, setTodoProject] = useState(selectedProject)
    const projects = [
        { id : 1, name : "personal", numOfTodos : 0},
        { id : 2, name : "Work", numOfTodos : 2},
        { id : 3, name : "School", numOfTodos : 3},
    ]
    function handleSubmit(e){

    }
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