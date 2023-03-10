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
import { AiOutlineHeart } from 'react-icons/ai'
import { BsFillShareFill } from 'react-icons/bs'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import { fillUser } from '../../../../redux/reducers/user'
import { userSelector } from '../../../../redux/reselect'
import axios from '../../../../utils/axios.js'
const MyProfilePostsItem = ({ item, idx }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = useSelector(userSelector)
	const delPosts = async id => {
		try {
			const res = await axios.patch(`/users/${user._id}/delpost`, {
				id,
			})
			dispatch(fillUser(res.data))
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			{idx !== 0 && <div className='requests__item-line'></div>}
			<div className='profile__posts-item'>
				<div className='profile__posts-item-top'>
					<div className='profile__posts-item-block'>
						<Image
							alt={item.login}
							className='profile__posts-item-avatar'
							src={`${process.env.REACT_APP_URL}${user.image}`}
							fallbackSrc='https://via.placeholder.com/100'
							onClick={() => navigate('/myProfile')}
						/>
						<div className='profile__posts-item-info'>
							<Link to={'/myProfile'} className='profile__posts-item-name'>
								{user.name} {user.surname}
							</Link>
							<p className='profile__posts-item-date'>{format(item.date)}</p>
						</div>
					</div>
					<Popover className='profile__posts-popover'>
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
								<ul className='profile__posts-popover-list'>
									<li className='profile__posts-popover-item'>Редактировать</li>
									<li
										className='profile__posts-popover-item'
										onClick={() => delPosts(item.id)}
									>
										Удалить запись
									</li>
								</ul>
							</PopoverBody>
						</PopoverContent>
					</Popover>
				</div>
				<p className='profile__posts-item-text'>{item.text}</p>
				<div className='profile__posts-item-bottom'>
					<Button colorScheme='blackAlpha' variant='ghost'>
						<AiOutlineHeart />
					</Button>
					<Button colorScheme='blackAlpha' variant='ghost'>
						<FaRegCommentAlt />
					</Button>
					<Button colorScheme='blackAlpha' variant='ghost'>
						<BsFillShareFill />
					</Button>
				</div>
			</div>
		</>
	)
}

export default MyProfilePostsItem
