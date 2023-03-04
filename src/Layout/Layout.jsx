import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import HomeAside from '../components/HomeAside/HomeAside'
import { fillUser } from '../redux/reducers/user'
import { userSelector } from '../redux/reselect'
import axios from '../utils/axios.js'
import Header from './Header/Header'
const Layout = () => {
	const { user } = useSelector(userSelector)
	const dispatch = useDispatch()
	useEffect(() => {
		axios(`/users/${user._id}`).then(res => dispatch(fillUser(res.data)))
	}, [])
	return (
		<div>
			<Header />
			<main className='main'>
				<div className='container'>
					<div className='main__content'>
						{user.login ? <HomeAside /> : ''}
						<div className='main__outlet'>
							<Outlet />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Layout
