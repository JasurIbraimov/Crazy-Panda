import React, { useEffect, useState } from 'react'
import './App.css'
import Error from './components/Error/Error'
import Loader from './components/Loader/Loader'
import ToDOs from './components/ToDOs/ToDOs'
const App = () => {
	const [toDOs, setToDOs] = useState([])
	const [offset, setOffset] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [pageCount, setPageCount] = useState(0)
    const [error, setError] = useState('')
	useEffect(() => {
		const fetchToDOs = async () => {
			try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/todos'
                )
                const data = await response.json()
                setPageCount(data.length / 50)
                const slicedData = data.slice(offset, offset + 50)
                setToDOs(slicedData)
            } catch (error) {
                setError(error.message)
            }
		}
		fetchToDOs()
	}, [offset])

	const createPages = () => {
		const pages = []
		for (let i = 0; i < pageCount; i++) {
			pages.push(i)
		}
		return pages.map((page, index) => (
			<div
				onClick={() => handleOnPageClick(page)}
				key={index}
				className={currentPage === page ? 'active' : ''}
			>
				{page + 1}
			</div>
		))
	}

	const handleOnPageClick = (page) => {
		const newOffset = page * 50
		setCurrentPage(page)
		setOffset(newOffset)
	}
    
	return (
		<div className='app'>
			<h1 className='app__title'>To DOs App </h1>
			{
                toDOs.length ? <ToDOs toDOs={toDOs} /> : (error.length ? <Error message={error}/> : <Loader/>)
            }
			<div className='app__pagination'>{createPages()}</div>
		</div>
	)
}

export default App
