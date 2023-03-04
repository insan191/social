import {
	Button,
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fillUser } from '../../../../redux/reducers/user.js'
import { userSelector } from '../../../../redux/reselect.js'
import axios from '../../../../utils/axios.js'
const MyFriendsCard = ({ item, idx }) => {
	const { user } = useSelector(userSelector)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const delFriends = async id => {
		try {
			const res = await axios.patch('/friends/delete', {
				senderId: user._id,
				recieverId: id,
			})
			dispatch(fillUser(res.data))
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			{idx !== 0 && <div className='myFriends__item-line'></div>}
			<div className='myFriends__item'>
				<div className='myFriends__item-block'>
					<Image
						alt={item.login}
						className='myFriends__item-avatar'
						src={`${process.env.REACT_APP_URL}${item.image}`}
						fallbackSrc='https://via.placeholder.com/100'
						onClick={() => navigate(`/profile/${item._id}`)}
					/>
					<div className='myFriends__item-info'>
						<Link to={`/profile/${item._id}`} className='myFriends__item-login'>
							{item.login}
						</Link>
						<p className='myFriends__item-name'>
							{item.name} {item.surname}
						</p>
					</div>
				</div>

				<Popover className='myFriends__popover'>
					<PopoverTrigger>
						<Button colorScheme='blackAlpha' variant='ghost'>
							<FiMoreVertical />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						bg=' rgba(0, 0, 0, 0.4)'
						border='none'
						borderRadius='8px'
						width='200px'
						placement='bottom-end'
					>
						<PopoverArrow />
						<PopoverBody>
							<ul className='myFriends__popover-list'>
								<li className='myFriends__popover-item'>Посмотреть друзей</li>
								<li
									className='myFriends__popover-item'
									onClick={() => delFriends(item._id)}
								>
									Удалить из друзей
								</li>
							</ul>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
		</>
	)
}

export default MyFriendsCard
