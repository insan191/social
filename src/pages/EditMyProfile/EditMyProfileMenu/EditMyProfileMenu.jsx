import React from 'react'

const EditMyProfileMenu = ({ menu, setMenu }) => {
	return (
		<ul className='editMyProfile__menu'>
			<li
				className='editMyProfile__menu-item'
				style={{
					background: menu === 'profile' && 'rgba(7, 88, 92, 0.1)',
					boxShadow: menu === 'profile' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
					backdropFilter: menu === 'profile' && 'blur(2px)',
					borderRadius: menu === 'profile' && ' 8px',
				}}
				onClick={() => setMenu('profile')}
			>
				Profile
			</li>
			<li
				className='editMyProfile__menu-item'
				style={{
					background: menu === 'contacts' && 'rgba(7, 88, 92, 0.1)',
					boxShadow: menu === 'contacts' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
					backdropFilter: menu === 'contacts' && 'blur(2px)',
					borderRadius: menu === 'contacts' && ' 8px',
				}}
				onClick={() => setMenu('contacts')}
			>
				Contacts
			</li>
		</ul>
	)
}

export default EditMyProfileMenu
