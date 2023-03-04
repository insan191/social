import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearch, findAllUser } from '../../redux/reducers/findUsers'
import { userSelector } from '../../redux/reselect'
import FriendsFollow from './FriendsFollow/FriendsFollow'
import FriendsRequests from './FriendsRequests/FriendsRequests'
import MyFiends from './MyFriends/MyFiends'

const Friends = () => {
	const dispatch = useDispatch()
	const [menu, setMenu] = useState('myFriends')
	const { user } = useSelector(userSelector)
	const { data, filter } = useSelector(
		store => store.persistedReducer.findUsers
	)
	const [search, setSearch] = useState(filter.search || '')
	useEffect(() => {
		dispatch(findAllUser({ login: user.login, search }))
		dispatch(changeSearch(search))
	}, [search])

	return (
		<section className='friends'>
			<div className='friends__row'>
				<div className='friends__left'>
					{menu === 'myFriends' ? (
						<MyFiends user={user} />
					) : menu === 'searchFriends' ? (
						<FriendsFollow search={search} setSearch={setSearch} data={data} />
					) : (
						<FriendsRequests />
					)}
				</div>
				<div className='friends__right'>
					<ul className='friends__menu'>
						<li
							className='friends__menu-item'
							style={{
								background: menu === 'myFriends' && 'rgba(7, 88, 92, 0.1)',
								boxShadow:
									menu === 'myFriends' && '0px 4px 41px rgba(0, 0, 0, 0.13)',
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
									menu === 'friendRequests' &&
									'0px 4px 41px rgba(0, 0, 0, 0.13)',
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
									menu === 'searchFriends' &&
									'0px 4px 41px rgba(0, 0, 0, 0.13)',
								backdropFilter: menu === 'searchFriends' && 'blur(2px)',
								borderRadius: menu === 'searchFriends' && ' 8px',
							}}
							onClick={() => setMenu('searchFriends')}
						>
							Search friends
						</li>
					</ul>
					<div className='friends__filter'></div>
				</div>
			</div>
		</section>
	)
}

export default Friends
