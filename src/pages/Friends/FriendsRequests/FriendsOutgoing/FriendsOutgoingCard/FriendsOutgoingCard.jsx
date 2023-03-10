import { Button, CloseButton, Image } from '@chakra-ui/react'
import axios from '../../../../../utils/axios.js'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fillUser } from '../../../../../redux/reducers/user.js'

const FriendsOutgoingCard = ({
	item,
	user
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	// const acceptFriends = async id => {
	// 	await acceptOutgoing({ senderId: id, recieverId: user._id }).unwrap()
	// 	dispatch(fillUser)
	// }
	// const handleCancelOutgoing = async id => {
	// 	await cancelOutgoing({ senderId: id, recieverId: user._id }).unwrap()
	// 	dispatch(fillUser)
	// }
	const handleAcceptFriends = (id) => {
		axios.patch('/request/add', {
				senderId: id,
				recieverId: user._id
		}).then((res) => {
				dispatch(fillUser(res.data))
		}).catch((err) => {
				console.log(err)
		})
}

const handleCancelOutgoing  = (id) => {
		axios.patch('/request/cancel', {
				senderId: id,
				recieverId: user._id
		}).then((res) => {
				dispatch(fillUser(res.data))
		}).catch((err) => {
				console.log(err)
		})
}

	return (
		<div className='requests__item'>
			<Image
				alt={item.login}
				className='requests__item-avatar'
				src={`${process.env.REACT_APP_URL}${item.image}`}
				fallbackSrc='https://via.placeholder.com/100'
				onClick={() => navigate(`/profile/${item._id}`)}
			/>

			<div className='requests__item-info'>
				<Link to={`/profile/${item._id}`} className='requests__item-login'>
					{item.login}
				</Link>
				<p className='requests__item-name'>
					{item.name} {item.surname}
				</p>
			</div>
			<div className='requests__item-right'>
				<Button
					colorScheme='blue'
					className='requests__item-confirm'
					onClick={() => handleAcceptFriends(item._id)}
				>
					Подтвердить
				</Button>
				<CloseButton
					className='requests__item-close'
					onClick={() => handleCancelOutgoing(item._id)}
				/>
			</div>
		</div>
	)
}

export default FriendsOutgoingCard
