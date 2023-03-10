import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findChats } from '../../redux/reducers/chats'
import { chatsSelector, userSelector } from '../../redux/reselect'
import ChatBlock from './ChatBlock/ChatBlock'
import ChatSidebar from './ChatSidebar/ChatSidebar'
const Chat = () => {
	const { user } = useSelector(userSelector)
	const { data } = useSelector(chatsSelector)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(findChats(user._id))
	}, [])
	return (
		<div className='chat'>
			<ChatSidebar user={user} chats={data} />
			<ChatBlock user={user} />
		</div>
	)
}

export default Chat
