import react, { useState } from 'react'
import AddNewProject from './AddNewProject'
import Project from './Project'
import { CaretUp, Palette, PencilFill } from 'react-bootstrap-icons'

function Projects(){
    const [showMenu, setShowMenu] = useState(true);
    const [edit, setEdit] = useState(true)
    const pencilColor = edit ? "#1EC94C" : "#000000"

    const projects = [
        { id : 1, name : "personal", numOfTodos : 0},
        { id : 2, name : "Work", numOfTodos : 2},
        { id : 3, name : "School", numOfTodos : 3},
    ]

    return(
        <div className='Projects'>
            <div className="header">
                <div className="title">
                    <Palette size="18" />
                    <p>Projects</p>
                </div>
                <div className="btns" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    {
                        showMenu && projects.length > 0 &&
                        <span className='edit' onClick={() => setEdit (edit => !edit)}>
                            <PencilFill size="15" color={pencilColor} />
                        </span>
                    }
                    <AddNewProject />
                    <span className='arrow'>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>
            <div className="items">
                {
                    projects.map(project =>
                        <Project
                            project={project}
                            key={project.id}
                            edit={edit}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Projects