import React, { useContext, useState } from 'react'
import RenameProject from './RenameProject'
import { Pencil, XCircle } from 'react-bootstrap-icons'
import Modal from './Modal'
import { TodoContext } from '../contex'
import { db } from '../firebase'
import { doc, deleteDoc, collection, query, where, getDocs, writeBatch } from 'firebase/firestore'

function Project({project, edit}){
    const { setSelectedProject } = useContext(TodoContext)
    const [showModal, setShowModal] = useState(false)

    const deleteProject = async (project) => {
        try {
            // Delete the project
            const projectRef = doc(db, 'projects', project.id)
            await deleteDoc(projectRef)

            // Delete all todos associated with this project
            const todosRef = collection(db, 'todos')
            const q = query(todosRef, where('projectName', '==', project.name))
            const querySnapshot = await getDocs(q)

            // Use batch write to delete all todos
            const batch = writeBatch(db)
            querySnapshot.forEach((doc) => {
                batch.delete(doc.ref)
            })
            await batch.commit()

            // Set selected project to 'today' after deletion
            setSelectedProject('today')
        } catch (error) {
            console.error("Error deleting project:", error)
            alert('Error deleting project')
        }
    }

    return(
        <div className='Project'>
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
                        <span 
                            className="edit" 
                            onClick={() => setShowModal(true)}
                        >
                            <Pencil size="13" />
                        </span>
                        <span 
                            className="delete"
                            onClick={() => deleteProject(project)}
                        >
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