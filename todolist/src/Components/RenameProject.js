import React, { useState } from 'react'
import ProjectForm from './ProjectForm'
import { db } from '../firebase'
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'

function RenameProject({ project, setShowModal }){
    const [newProjectName, setNewProjectName] = useState(project.name)

    async function handleSubmit(e) {
        e.preventDefault()

        if (newProjectName && newProjectName !== project.name) {
            try {
                // Check if project name already exists
                const projectsRef = collection(db, 'projects')
                const q = query(projectsRef, where('name', '==', newProjectName))
                const querySnapshot = await getDocs(q)

                if (querySnapshot.empty) {
                    // Update project name in projects collection
                    const projectRef = doc(db, 'projects', project.id)
                    await updateDoc(projectRef, {
                        name: newProjectName
                    })

                    // Update project name in all associated todos
                    const todosRef = collection(db, 'todos')
                    const todosQuery = query(todosRef, where('projectName', '==', project.name))
                    const todosSnapshot = await getDocs(todosQuery)

                    const updatePromises = todosSnapshot.docs.map(doc => {
                        return updateDoc(doc.ref, {
                            projectName: newProjectName
                        })
                    })

                    await Promise.all(updatePromises)

                    setShowModal(false)
                } else {
                    alert('Project name already exists!')
                }
            } catch (error) {
                console.error("Error renaming project:", error)
                alert('Error renaming project')
            }
        } else {
            if (!newProjectName) {
                alert('Please enter a project name!')
            }
            setShowModal(false)
        }
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