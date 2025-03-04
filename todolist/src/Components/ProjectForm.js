import React from 'react'

function ProjectForm({
    handleSubmit, 
    heading, 
    value, 
    setValue, 
    setShowModal, 
    confirmButtonText
}){
    return (
        <form onSubmit={handleSubmit} className='ProjectForm'>
            <h3>{heading}</h3>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type='text'
                placeholder='project name...'
                autoFocus
            />
            <button 
                type="button" 
                className='cancel' 
                onClick={() => setShowModal(false)}
            >
                cancel
            </button>
            <button 
                type="submit" 
                className="confirm"
            >
                {confirmButtonText}
            </button>
        </form>
    )
}

export default ProjectForm