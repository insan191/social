import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import Chat from '../pages/Chat/Chat'
import EditMyProfile from '../pages/EditMyProfile/EditMyProfile'
import Friends from '../pages/Friends/Friends'
import Home from '../pages/Home/Home'
import MyProfile from '../pages/MyProfile/MyProfile'
import NotFound from '../pages/NotFound/NotFound'
import Photos from '../pages/Photos/Photos'
import Profile from '../pages/Profile/Profile'

const PrivateRouting = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='' element={<Home />} />
				<Route path='friends' element={<Friends />} />
				<Route path='myprofile' element={<MyProfile />} />
				<Route path='photos' element={<Photos />} />
				<Route path='chat/*' element={<Chat />} />
				<Route path='editmyprofile' element={<EditMyProfile />} />
				<Route path='profile/:id' element={<Profile />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default PrivateRouting
