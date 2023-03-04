import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { userSelector } from '../../redux/reselect'

const NotFound = () => {
	const { user } = useSelector(userSelector)
	if (!user.login.length) {
		return <Navigate to='/login' />
	}
	return <Navigate to='/' />
}

export default NotFound
