import React from 'react'
import { useSelector } from 'react-redux'
const MyProfile = () => {
	const { user } = useSelector(state => state.user)
	return (
		<div className='myProfile'>
			<div className='container'>
				<h1 className='myProfile__name'>{user.name}</h1>
				<img src={`http://localhost:4444${user.image}`} />
			</div>
		</div>
	)
}

export default MyProfile
