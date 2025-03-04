import React from 'react';
import { BellFill, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons';

function TodoForm({
    handleSubmit,
    heading = false,
    text, setText,
    day, setDay,
    time, setTime,
    todoProject, setTodoProject,
    projects,
    showButtons = false,
    setShowModal = false
}) {
    return (
        <form onSubmit={handleSubmit} className='TodoForm'>
            <div className="text">
                {heading && <h3>{heading}</h3>}
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='To do ...'
                    autoFocus
                />
            </div>
            <div className="remind">
                <BellFill />
                <p>Remind Me!</p>
            </div>
            <div className="pick-day">
                <div className="title">
                    <CalendarDay />
                    <p>Choose a day</p>
                </div>
                <input 
                    type="date" 
                    value={day}
                    onChange={e => setDay(e.target.value)}
                />
            </div>
            <div className="pick-time">
                <div className="title">
                    <Clock />
                    <p>Choose time</p>
                </div>
                <input 
                    type="time" 
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
            </div>
            <div className="pick-project">
                <div className="title">
                    <Palette />
                    <p>Choose a project</p>
                </div>
                <div className="projects">
                    {
                        projects.length > 0 ?
                        projects.map(project => 
                            <div 
                                className={`project ${todoProject === project.name ? 'active' : ''}`}
                                key={project.id}
                                onClick={() => setTodoProject(project.name)}
                            >
                                {project.name}
                            </div>
                        )
                        :
                        <div style={{color: '#ff0000'}}>
                            please add a project
                        </div>
                    }
                </div>
            </div>
            {
                showButtons &&
                <div className="cancel" onClick={() => setShowModal(false)}>
                    <X size='40' />
                </div>
            }
            {
                showButtons &&
                <div className="confirm">
                    <button>+ Add to do</button>
                </div>
            }
        </form>
    )
}

export default TodoForm