import React, { useState } from 'react';
import Modal from './Modal';
import { BellFill, CalendarDay, Clock, Palette, X } from 'react-bootstrap-icons';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function AddNewTodo(){
    const [showModal, setShowModal] = useState(false)
    const [text, setText] = useState('')
    const [day, setDay] = useState(new Date())
    const [time, setTime] = useState(new Date())

    return(
        <div className='AddNewTodo'>
            <div className="btn">
                <button onClick={() => setShowModal(true)}>
                    + New Todo
                </button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div>
                        <form>
                            <div className="text">
                                <h3>Add New To do</h3>
                                <input
                                    type='text'
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder='To do..'
                                    autoFocus
                                />
                            </div>
                            <div className="remind">
                                <BellFill />
                                <p>Remind Me in</p>
                            </div>
                            <div className="pick-day">
                                <div className="title">
                                    <CalendarDay />
                                    <p>Choose a day</p>
                                </div>
                                <DatePicker
                                    value={day}
                                    onChange={(newDay) => setDay(newDay)}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </div>
                            <div className="pick-time">
                                <div className="title">
                                    <Clock />
                                    <p>Choose a time</p>
                                </div>
                                <TimePicker
                                    value={time}
                                    onChange={(newTime) => setTime(newTime)}
                                    slotProps={{ 
                                        textField: { size: 'small' },
                                    }}
                                    views={['hours', 'minutes']}
                                />
                            </div>
                            <div className="pick-project">
                                <div className="title">
                                    <Palette />
                                    <p>Choose a project</p>
                                </div>
                                <div className="projects">
                                    <div className="project active">
                                        test
                                    </div>
                                    <div className="project">
                                        test2
                                    </div>
                                </div>
                            </div>
                            <div className="cancel" onClick={() => setShowModal(false)}>
                                <X size='30' />
                            </div>
                            <div className="confirm">
                                <button>+ Add to do list</button>
                            </div>
                        </form>
                    </div>
                </LocalizationProvider>
            </Modal>
        </div>
    )
}

export default AddNewTodo