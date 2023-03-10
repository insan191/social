import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../redux/reselect'
import MyProfileAddPosts from './MyProfileAddPosts/MyProfileAddPosts'
import MyProfileInfo from './MyProfileInfo/MyProfileInfo'
import MyProfilePhotos from './MyProfilePhotos/MyProfilePhotos'
import MyProfilePosts from './MyProfilePosts/MyProfilePosts'

const MyProfile = () => {
	const { user } = useSelector(userSelector)
	return (
		<section className='profile'>
			<MyProfileInfo user={user} />
			<div className='profile__row'>
				<div className='profile__left'>
					<MyProfilePhotos user={user}/>
					<MyProfileAddPosts user={user} />
					<MyProfilePosts user={user} />
				</div>
				<div className='profile__right'>
					<div className='profile__friends'></div>
				</div>
			</div>
		</section>
	)
}

export default MyProfile
