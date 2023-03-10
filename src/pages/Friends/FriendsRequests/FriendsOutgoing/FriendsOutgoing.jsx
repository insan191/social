import React from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../../../redux/reselect.js'
import FriendsOutgoingCard from './FriendsOutgoingCard/FriendsOutgoingCard.jsx'

import { useGetOutgoingQuery } from '../../../../redux/reducers/outgoing.js'

const FriendsOutgoing = () => {
	const { user } = useSelector(userSelector)
	const { data = [], isLoading } = useGetOutgoingQuery(user.notification)
	if (isLoading) {
		return <h2>loading...</h2>
	}
	return (
		<div className='requests__list'>
			{data.map(item => (
				<FriendsOutgoingCard item={item} user={user} key={item._id} />
			))}
		</div>
	)
}

export default FriendsOutgoing
