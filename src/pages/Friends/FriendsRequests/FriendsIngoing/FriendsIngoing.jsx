import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	useCancelIngoingMutation,
	useGetIngoingQuery,
} from '../../../../redux/reducers/ingoing.js'
import { fillUser } from '../../../../redux/reducers/user.js'
import { userSelector } from '../../../../redux/reselect.js'
import FriendsIngoingCard from './FriendsIngoingCard/FriendsIngoingCard.jsx'

const FriendsIngoing = () => {
	const dispatch = useDispatch()
	const { user } = useSelector(userSelector)
	const [cancelIngoing, obj] = useCancelIngoingMutation()
	if (obj.data) {
		dispatch(fillUser(obj.data))
	}
	const { data = [], isLoading } = useGetIngoingQuery(
		obj.data ? obj.data.requests : user.requests
	)
	if (isLoading) {
		return <h2>loading...</h2>
	}

	return (
		<div className='requests__list'>
			{data.map(item => (
				<FriendsIngoingCard
					item={item}
					user={user}
					key={item._id}
					cancelIngoing={cancelIngoing}
				/>
			))}
		</div>
	)
}

export default FriendsIngoing
