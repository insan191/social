import {
	Avatar,
	Button,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { IoIosCreate } from 'react-icons/io'
import { MdAddIcCall } from 'react-icons/md'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetFriendsQuery } from '../../../redux/reducers/friends'
import ChatSidebarItem from './ChatSidebarItem/ChatSidebarItem'

const ChatSidebar = ({ user, chats }) => {
	const { data = [] } = useGetFriendsQuery(user.friends)
	const textLengthLimit = (text, limit) => {
		text = text.trim()
		if (text.length <= limit) return text

		text = text.slice(0, limit)

		return text.trim() + '...'
	}
	return (
		<div className='chat__sidebar'>
			<div className='chat__sidebar-search'>
				<span className='chat__sidebar-search-loupe'>
					<AiOutlineSearch />
				</span>
				<input
					placeholder='Поиск'
					className='chat__sidebar-search-field'
					type='text'
				/>
				<Button size='sm' colorScheme='blackAlpha' variant='ghost'>
					<MdAddIcCall />
				</Button>
				<Button size='sm' colorScheme='blackAlpha' variant='ghost'>
					<IoIosCreate />
				</Button>
				<Popover className='chat__block-top-popover'>
					<PopoverTrigger>
						<Button size='sm' colorScheme='blackAlpha' variant='ghost'>
							<FiMoreHorizontal />
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
							<ul className='chat__block-top-popover-list'>
								<li className='chat__block-top-popover-item'>
									Search message history
								</li>
								<li className='chat__block-top-popover-item'>Report</li>
							</ul>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			</div>
			<div className='chat__sidebar-friends'>
				<Swiper slidesPerView={4} navigation modules={[Navigation]}>
					{data.map(item => (
						<SwiperSlide key={item._id}>
							<div className='chat__sidebar-friends-item'>
								<Avatar
									name={`${item.name} ${item.surname}`}
									src={`${process.env.REACT_APP_URL}${item.image}`}
									className='chat__sidebar-friends-avatar'
								/>
								<p className='chat__sidebar-friends-name'>
									{textLengthLimit(item.name, 7)}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className='chat__sidebar-list'>
				{chats.map(item => (
					<ChatSidebarItem
						key={item._id} chatId={item._id}
						id={item.members.filter(el => el !== user._id)}
					/>
				))}
			</div>
		</div>
	)
}

export default ChatSidebar
