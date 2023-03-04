import {
	Button,
	Icon,
	Image,
	Popover,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiFillHome, AiFillPhone, AiOutlineInfoCircle } from 'react-icons/ai'
import { GiPresent } from 'react-icons/gi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiMapPinLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { userSelector } from '../../redux/reselect'
import MyProfileAddPosts from './MyProfileAddPosts/MyProfileAddPosts'
import MyProfileCover from './MyProfileCover/MyProfileCover'
import MyProfilePhotos from './MyProfilePhotos/MyProfilePhotos'
import MyProfilePosts from './MyProfilePosts/MyProfilePosts'

const MyProfile = () => {
	const [mouse, setMouse] = useState(false)
	const { user } = useSelector(userSelector)
	return (
		<section className='profile'>
			<div
				className='profile__info'
				onMouseEnter={() => setMouse(prev => !prev)}
				onMouseLeave={() => setMouse(prev => !prev)}
				style={{
					background: `url(${process.env.REACT_APP_URL}${user.cover}) center/cover no-repeat`,
				}}
			>
				<div className='profile__info-top'>
					<MyProfileCover user={user} mouse={mouse} />
				</div>
				<div className='profile__info-bottom'>
					<div className='profile__info-avatar'>
						<Image
							alt={user.login}
							className='profile__info-image'
							src={`${process.env.REACT_APP_URL}${user.image}`}
							fallbackSrc='https://via.placeholder.com/100'
						/>
					</div>
					<div className='profile__info-user'>
						<h3 className='profile__info-name'>
							{user.name} {user.surname}
						</h3>
						<div className='profile__info-group'>
							<span className='profile__info-city'>
								<Icon as={RiMapPinLine} />
								<span>{user.city}</span>
							</span>
							<Popover placement='top'>
								<PopoverTrigger>
									<Button className='profile__info-more' bg='transparent'>
										<Icon as={AiOutlineInfoCircle} />
										<span>Подробнее</span>
									</Button>
								</PopoverTrigger>
								<PopoverContent
									bg=' rgba(0, 0, 0, 0.4)'
									border='none'
									borderRadius='8px'
								>
									<div className='profile__popover'>
										<h3 className='profile__popover-title'>
											Подробная информация
										</h3>
										<PopoverCloseButton />
										<ul className='profile__popover-list'>
											<li className='profile__popover-item'>
												<Icon as={MdOutlineAlternateEmail} />
												<span className='profile__popover-blue'>
													{user.login}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={GiPresent} />
												<span className='profile__popover-grey'>
													День рождения:{' '}
												</span>
												<span className='profile__popover-blue'>
													{user.birthday}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={AiFillHome} />
												<span className='profile__popover-grey'>Город: </span>
												<span className='profile__popover-blue'>
													{user.city}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={AiFillPhone} />
												<span className='profile__popover-grey'>
													Номер телефона:{' '}
												</span>
												<span className='profile__popover-blue'>
													{user.phone}
												</span>
											</li>
										</ul>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
					<button className='profile__info-change'>Change profile</button>
				</div>
			</div>
			<div className='profile__row'>
				<div className='profile__left'>
					<MyProfilePhotos />
					<MyProfileAddPosts user={user} />
					<MyProfilePosts user={user} />
				</div>
				<div className='profile__right'>
					<div className='profile__friends'></div>
				</div>
			</div>
		</section>
	)
}

export default MyProfile
