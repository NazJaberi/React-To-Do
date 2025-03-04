// @ts-nocheck
import react, { useContext, useState } from 'react'
import RenameProject from './RenameProject'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import Modal from './Modal'
import { TodoContext } from '../contex'

function Project({project, edit}){

    const { setSelectedProject } = useContext(TodoContext)
    const [showModal, setShowModal] = useState(false)
    
    return(
        <div className='Project' style={{
        }}>
            <div 
                 className="name"
                 onClick={() => setSelectedProject(project.name)}

            >
                {project.name}
            </div>
            <div className="btns" style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                {edit ? (
                    <div className="edit-delete" style={{
                        display: 'flex',
                        gap: '4px'
                    }}>
                        <span className="edit" onClick={() => setShowModal(true)}>
                            <Pencil size="13" />
                        </span>
                        <span className="delete">
                            <XCircle size="13" />
                        </span>
                    </div>
                ) : (
                    project.numOfTodos > 0 && (
                        <div className="total-todos">
                            {project.numOfTodos}
                        </div>
                    )
                )}
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <RenameProject project={project} setShowModal={setShowModal}/>
            </Modal>
        </div>
    )
}

export default Project