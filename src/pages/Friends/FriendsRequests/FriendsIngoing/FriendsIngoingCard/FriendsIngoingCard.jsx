import { CloseButton, Image } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FriendsIngoingCard = ({ item, user, cancelIngoing, idx }) => {
	const navigate = useNavigate()

	const handleCancelMyRequest = async id => {
		await cancelIngoing({ senderId: user._id, recieverId: id }).unwrap()
	}
	return (
		<>
			{idx !== 0 && <div className='requests__item-line'></div>}
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
					<CloseButton
						className='requests__item-close'
						onClick={() => handleCancelMyRequest(item._id)}
					/>
				</div>
			</div>
		</>
	)
}

export default FriendsIngoingCard
