import { Avatar } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { findChat } from '../../../../redux/reducers/chat.js'
import { chatSelector } from '../../../../redux/reselect.js'

const ChatSidebarItem = ({ id, chatId }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const params = useParams()
	useEffect(() => {
		dispatch(findChat(id))
	}, [])
	const { data } = useSelector(chatSelector)
	return (
		<div
			className='chat__sidebar-list-item'
			style={{
				background: params['*'] === chatId && 'rgba(255, 255, 255, 0.1)',
			}}
			onClick={() => navigate(`/chat/${chatId}`)}
		>
			<Avatar
				className='chat__sidebar-list-img'
				name={`${data.name} ${data.surname}`}
				src={`http://localhost:4444${data.image}`}
			/>
			<div className='chat__sidebar-list-group'>
				<h3 className='chat__sidebar-list-name'>{`${data.name} ${data.surname}`}</h3>
				<p className='chat__sidebar-list-message'>{data.phone}</p>
			</div>
		</div>
	)
}

export default ChatSidebarItem
