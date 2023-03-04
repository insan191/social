import {
	Button,
	Icon,
	Image,
	Popover,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React from 'react'
import { AiFillHome, AiFillPhone, AiOutlineInfoCircle } from 'react-icons/ai'
import { GiPresent } from 'react-icons/gi'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import { RiMapPinLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Profile = () => {
	const { id } = useParams()
	const { data } = useSelector(store => store.persistedReducer.findUsers)
	const profile = data.find(item => item._id === id)
	return (
		<section className='profile'>
			<div
				className='profile__info'
				style={{
					background: `url(${process.env.REACT_APP_URL}${profile.cover}) center/cover no-repeat`,
				}}
			>
				<div className='profile__info-top'></div>
				<div className='profile__info-bottom'>
					<div className='profile__info-avatar'>
						<Image
							alt={profile.login}
							className='profile__info-image'
							src={`${process.env.REACT_APP_URL}${profile.image}`}
							fallbackSrc='https://via.placeholder.com/100'
						/>
					</div>
					<div className='profile__info-user'>
						<h3 className='profile__info-name'>
							{profile.name} {profile.surname}
						</h3>
						<div className='profile__info-group'>
							<span className='profile__info-city'>
								<Icon as={RiMapPinLine} />
								<span>{profile.city}</span>
							</span>
							<Popover placement='bottom-end' isLazy>
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
													{profile.login}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={GiPresent} />
												<span className='profile__popover-grey'>
													День рождения:{' '}
												</span>
												<span className='profile__popover-blue'>
													{profile.birthday}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={AiFillHome} />
												<span className='profile__popover-grey'>Город: </span>
												<span className='profile__popover-blue'>
													{profile.city}
												</span>
											</li>
											<li className='profile__popover-item'>
												<Icon as={AiFillPhone} />
												<span className='profile__popover-grey'>
													Номер телефона:{' '}
												</span>
												<span className='profile__popover-blue'>
													{profile.phone}
												</span>
											</li>
										</ul>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Profile
