import React, {useState, useEffect} from 'react'
import ToDO from '../ToDO/ToDO'
import './ToDOs.css'

import {ReactComponent as SearchIcon} from '../../assets/search.svg'
const ToDos = ({toDOs}) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchingElements, setSearchingElements] = useState(toDOs)
    const [descendingOrder, setDescendingOrder] = useState(false)
    useEffect(() => {
        setSearchingElements(toDOs.filter(todo => todo.title.toLowerCase().indexOf(searchValue) !== -1 ))
    }, [toDOs, searchValue])
    const handleOnHeaderClick = (header, descendingOrder) => {
		setDescendingOrder(!descendingOrder)
		setSearchingElements((prev) => [
			...prev.sort((a, b) => {
				if (descendingOrder) {
					if (a[header] > b[header]) {
						return 1
					}
					if (a[header] < b[header]) {
						return -1
					}
					return 0
				} else {
					
                    if (a[header] < b[header]) {
						return 1
					}
					if (a[header] > b[header]) {
						return -1
					}
					return 0
				}
			}),
		])
	}

    return (
        <div className='todos'>
            <div className='todos__search'>
                <input value={searchValue} type="text" onChange={e => setSearchValue(e.target.value)}/>
                <SearchIcon className='todos__search-icon'/>
            </div>
            <div className='todos__head'>
				<div onClick={() => handleOnHeaderClick('id', descendingOrder)}>
					№
				</div>
				<div
					onClick={() =>
						handleOnHeaderClick('title', descendingOrder)
					}
				>
					To DO
				</div>
				<div
					onClick={() =>
						handleOnHeaderClick('completed', descendingOrder)
					}
				>
					State
				</div>
			</div>
            <div className='todos__content'>
                {
                    searchingElements.length !== 0 ? searchingElements.map(({id, ...other}) => (
                        <ToDO key={id} {...other} id={id}/>
                    )) : <div className='todos__no-match'>No match!</div>
                }
            </div>
        </div>
    )
}

export default ToDos
