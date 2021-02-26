import React from 'react'
import {ReactComponent as CompletedIcon} from '../../assets/completed.svg'
import {ReactComponent as NotCompletedIcon} from '../../assets/not-completed.svg'
import './ToDO.css'
const ToDO = ({id, title, completed}) => {
    return (
        <div className='todo'>
            <div>{id}</div>
            <div>{title}</div>
            <div>{
                completed ? <CompletedIcon className='todo__icon'/> : <NotCompletedIcon className='todo__icon'/>
            }</div>
    </div>
    )
}

export default ToDO
