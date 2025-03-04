import react, { useState } from 'react'
import ProjectForm from './ProjectForm'

function RenameProject({ project, setShowModal }){
    const [newProjectName, setNewProjectName] = useState(project.name)

    function handleSubmit(e) {
        e.preventDefault()

        setShowModal(false)
    }

    return(
        <div className='RenameProject'>
            <ProjectForm
                handleSubmit={handleSubmit}
                heading='Edit Project Name'
                value={newProjectName}
                setValue={setNewProjectName}
                setShowModal={setShowModal}
                confirmButtonText='Confirm'
            />
        </div>
    )
}

export default RenameProject