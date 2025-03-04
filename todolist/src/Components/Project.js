// @ts-nocheck
import react, { useState } from 'react'
import RenameProject from './RenameProject'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import Modal from './Modal'

function Project({project, edit}){
    const [showModal, setShowModal] = useState(false)
    
    return(
        <div className='Project' style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.25rem',
            margin: '5px'
        }}>
            <div className="name">
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