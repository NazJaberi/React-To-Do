import react from 'react'
import { CalendarDate, CaretUp } from 'react-bootstrap-icons'
import { calanderItems } from '../constants'

function Calandar(){
    return(
        <div className='calendar'>
            <div className="header">
                <div className="title">
                    <CalendarDate size="18"/>
                    <p>Calendar</p>
                </div>
                <div className="btns">
                    <span>
                        <CaretUp size="20" />
                    </span>
                </div>
            </div>
            <div className="items">
                {
                    calanderItems.map(item =>
                        <div className="item" key={item}>
                            {item}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Calandar