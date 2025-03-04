import React, { useState } from 'react'
import { Plus } from 'react-bootstrap-icons'
import Modal from './Modal'
import ProjectForm from './ProjectForm'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function AddNewProject(){
    const [showModal, setShowModal] = useState(false)
    const [projectName, setProjectName] = useState('')
   
    async function handleSubmit(e){
        e.preventDefault()

        if (projectName){
            try {
                // Create a reference to the projects collection
                const projectsRef = collection(db, 'projects')
                
                // Check if project exists
                const projectQuery = query(projectsRef, where('name', '==', projectName))
                const querySnapshot = await getDocs(projectQuery)

                if (querySnapshot.empty) {
                    // Add new project
                    await addDoc(projectsRef, {
                        name: projectName
                    })
                    
                    // Reset form and close modal
                    setProjectName('')
                    setShowModal(false)
                } else {
                    alert('Project name already exists')
                }
            } catch (error) {
                console.error("Error adding project:", error)
                alert('Error adding project')
            }
        } else {
            alert('Please enter a project name')
        }
    }

    return (
        <div className='AddNewProject'>
            <div className="add-button">
                <span onClick={() => setShowModal(true)}>
                    <Plus size="20" />
                </span>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <ProjectForm
                    handleSubmit={handleSubmit}
                    heading='New Project'
                    value={projectName}
                    setValue={setProjectName}
                    setShowModal={setShowModal}
                    confirmButtonText='+ Add Project'
                />
            </Modal>
        </div>
    )
}

export default AddNewProject