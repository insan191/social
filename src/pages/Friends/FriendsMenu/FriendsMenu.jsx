import React from 'react'

const FriendsMenu = ({ menu, setMenu }) => {
	return (
		<ul className='friends__menu'>
			<li
				className='friends__menu-item'
				style={{
					background: menu === 'myFriends' && 'rgba(7, 88, 92, 0.1)',
					boxShadow: menu === 'myFriends' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
					backdropFilter: menu === 'myFriends' && 'blur(2px)',
					borderRadius: menu === 'myFriends' && ' 8px',
				}}
				onClick={() => setMenu('myFriends')}
			>
				My friends
			</li>
			<li
				className='friends__menu-item'
				style={{
					background: menu === 'friendRequests' && 'rgba(7, 88, 92, 0.1)',
					boxShadow:
						menu === 'friendRequests' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
					backdropFilter: menu === 'friendRequests' && 'blur(2px)',
					borderRadius: menu === 'friendRequests' && ' 8px',
				}}
				onClick={() => setMenu('friendRequests')}
			>
				Friend requests
			</li>
			<li
				className='friends__menu-item'
				style={{
					background: menu === 'searchFriends' && 'rgba(7, 88, 92, 0.1)',
					boxShadow:
						menu === 'searchFriends' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
					backdropFilter: menu === 'searchFriends' && 'blur(2px)',
					borderRadius: menu === 'searchFriends' && ' 8px',
				}}
				onClick={() => setMenu('searchFriends')}
			>
				Search friends
			</li>
		</ul>
	)
}

export default FriendsMenu
