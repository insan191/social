import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearch, findAllUser } from '../../redux/reducers/findUsers'
import { userSelector } from '../../redux/reselect'
import FriendsFollow from './FriendsFollow/FriendsFollow'
import FriendsMenu from './FriendsMenu/FriendsMenu'
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
					<FriendsMenu menu={menu} setMenu={setMenu} />
					<div className='friends__filter'></div>
				</div>
			</div>
		</section>
	)
}

export default Friends
