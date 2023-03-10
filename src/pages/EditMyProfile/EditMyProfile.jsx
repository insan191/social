import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../redux/reselect'
import EditMyProfileContacts from './EditMyProfileContacts/EditMyProfileContacts'
import EditMyProfileInfo from './EditMyProfileInfo/EditMyProfileInfo'
import EditMyProfileMain from './EditMyProfileMain/EditMyProfileMain'
import EditMyProfileMenu from './EditMyProfileMenu/EditMyProfileMenu'

const EditMyProfile = () => {
	const { user } = useSelector(userSelector)
	const [menu, setMenu] = useState('profile')
	return (
		<section className='editMyProfile'>
			<div className='editMyProfile__left'>
				<EditMyProfileInfo user={user} />
				{menu === 'profile' ? (
					<EditMyProfileMain user={user} />
				) : (
					<EditMyProfileContacts user={user} />
				)}
			</div>
			<div className='editMyProfile__right'>
				<EditMyProfileMenu menu={menu} setMenu={setMenu} />
			</div>
		</section>
	)
}

export default EditMyProfile
