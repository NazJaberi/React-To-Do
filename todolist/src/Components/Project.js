import react from 'react'
import RenameProject from './RenameProject'
import { Pencil, XCircle } from 'react-bootstrap-icons'

function Project({project, edit}){
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
                        <span className="edit">
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
        </div>
    )
}

export default Project