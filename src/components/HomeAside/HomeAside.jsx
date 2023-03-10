import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdPhotos } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'

const HomeAside = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	return (
		<aside className='aside'>
			<ul className='aside__menu'>
				<li
					className={
						pathname === '/myprofile' ? 'aside__item active' : 'aside__item'
					}
					onClick={() => navigate('/myprofile')}
				>
					<BiUserCircle />
					My profile
				</li>
				<li
					className={
						pathname === '/chat' ? 'aside__item active' : 'aside__item'
					}
					onClick={() => navigate('/chat')}
				>
					<BsFillChatDotsFill />
					Messenger
				</li>
				<li
					className={
						pathname === '/friends' ? 'aside__item active' : 'aside__item'
					}
					onClick={() => navigate('/friends')}
				>
					<HiOutlineUsers />
					Friends
				</li>
				<li
					className={
						pathname === '/photos' ? 'aside__item active' : 'aside__item'
					}
					onClick={() => navigate('/photos')}
				>
					<IoMdPhotos />
					My photos
				</li>
			</ul>
		</aside>
	)
}

export default HomeAside
