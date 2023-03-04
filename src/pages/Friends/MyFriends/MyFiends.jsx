import React from 'react'
import { useGetFriendsQuery } from '../../../redux/reducers/friends'
import MyFriendsCard from './MyFriendsCard/MyFriendsCard'

const MyFiends = ({ user }) => {
	const { data = [], isLoading } = useGetFriendsQuery(user.friends)
	if (isLoading) {
		return <h2>loading...</h2>
	}
	return (
		<div className='myFriends'>
			<h2 className='myFriends__title'>My Fiends</h2>
			<ul className='myFriends__list'>
				{data.map((item, idx) => (
					<MyFriendsCard item={item} key={item._id} idx={idx} />
				))}
			</ul>
		</div>
	)
}

export default MyFiends
