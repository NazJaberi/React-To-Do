import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export function useTodos(){
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const todosCollection = collection(db, 'todos')
        
        const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTodos(data)
        })

        return () => unsubscribe()
    }, []) // Added dependency array

    return todos
}

export function useProjects(){
    const [projects, setProjects] = useState([])
    const [todos, setTodos] = useState([]) // Need todos for calculation

    function calculateNumOfTodos(projectName, todos) {
        return todos.filter(todo => todo.projectName === projectName).length
    }

    useEffect(() => {
        // Subscribe to todos
        const todosCollection = collection(db, 'todos')
        const unsubscribeTodos = onSnapshot(todosCollection, (snapshot) => {
            const todosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTodos(todosData)
        })

        // Subscribe to projects
        const projectsCollection = collection(db, 'projects')
        const unsubscribeProjects = onSnapshot(projectsCollection, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => {
                const projectName = doc.data().name
                return {
                    id: doc.id,
                    name: projectName,
                    numOfTodos: calculateNumOfTodos(projectName, todos)
                }
            })
            setProjects(projectsData)
        })

        return () => {
            unsubscribeTodos()
            unsubscribeProjects()
        }
    }, [todos]) 

    return projects
}