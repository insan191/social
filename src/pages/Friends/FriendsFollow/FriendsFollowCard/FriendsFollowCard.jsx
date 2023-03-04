import { Image, useToast } from '@chakra-ui/react'
import React from 'react'
import { RiUserAddLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fillUser } from '../../../../redux/reducers/user'
import { userSelector } from '../../../../redux/reselect'
import axios from '../../../../utils/axios'
const FriendsFollowCard = ({ item }) => {
	const { user } = useSelector(userSelector)
	const dispatch = useDispatch()
	const toast = useToast()
	const navigate = useNavigate()
	const sendRequest = id => {
		axios
			.patch(`/request/${user._id}`, { request: id })
			.then(res => {
				toast({
					title: 'Запрос отправлен',
					status: 'success',
					duration: 5000,
					position: 'center-top',
					isClosable: true,
				})
				dispatch(fillUser(res.data))
			})
			.catch(() =>
				toast({
					title: 'Ошибка при отправке запроса',
					status: 'error',
					duration: 5000,
					position: 'center-top',
					isClosable: true,
				})
			)
	}
	return (
		<div className='friends__card'>
			<Image
				alt={item.login}
				className='friends__card-img'
				src={`${process.env.REACT_APP_URL}${item.image}`}
				fallbackSrc='https://via.placeholder.com/150'
				onClick={() => navigate(`/profile/${item._id}`)}
			/>

			<div className='friends__card-bottom'>
				<div className='friends__card-info'>
					<Link to={`/profile/${item._id}`} className='friends__card-link'>
						{item.name} {item.surname}
					</Link>
					<p className='friends__card-friends'>Нет общих друзей</p>
				</div>

				{user.requests.includes(item._id) || user.friends.includes(item._id) ? (
					''
				) : (
					<button
						className='friends__card-btn'
						onClick={() => sendRequest(item._id)}
					>
						<RiUserAddLine />
					</button>
				)}
			</div>
		</div>
	)
}

export default FriendsFollowCard
