import {
	Image,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fillUser } from '../../../redux/reducers/user'
import axios from '../../../utils/axios.js'
import EditMyProfileCover from './EditMyProfileCover/EditMyProfileCover'

const EditMyProfileInfo = ({ user }) => {
	const [mouse, setMouse] = useState(false)
	const image = useRef()
	const dispatch = useDispatch()
	const addImage = async data => {
		try {
			const res = await axios.patch(`/users/${user._id}/addimage`, {
				url: data,
			})

			dispatch(fillUser(res.data))
		} catch (err) {
			console.log(err)
		}
	}
	const handleImage = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			await axios
				.post('/upload', formData)
				.then(({ data }) => addImage(data.url))
		} catch (error) {
			console.log(error)
			alert('Ошибка при загрузке файла')
		}
	}

	return (
		<div
			className='editMyProfile__info'
			onMouseEnter={() => setMouse(true)}
			onMouseLeave={() => setMouse(false)}
			style={{
				background: `url(${process.env.REACT_APP_URL}${user.cover}) center/cover no-repeat`,
			}}
		>
			<div className='editMyProfile__info-top'>
				<EditMyProfileCover user={user} mouse={mouse} />
			</div>
			<div className='editMyProfile__info-bottom'>
				<Popover>
					<PopoverTrigger>
						<div className='editMyProfile__info-avatar'>
							<Image
								alt={user.login}
								className='editMyProfile__info-image'
								src={`${process.env.REACT_APP_URL}${user.image}`}
								fallbackSrc='https://via.placeholder.com/100'
							/>
						</div>
					</PopoverTrigger>
					<PopoverContent
						bg=' rgba(0, 0, 0, 0.4)'
						border='none'
						borderRadius='8px'
						width='210px'
						placement='bottom-end'
					>
						<PopoverArrow />
						<PopoverBody>
							<ul className='editMyProfile__info-popover-list'>
								<li
									className='editMyProfile__info-popover-item'
									onClick={() => image.current.click()}
								>
									Загрузить изображение
								</li>
								<li
									className='editMyProfile__info-popover-item'
									onClick={() => addImage('')}
								>
									Удалить
								</li>
							</ul>
						</PopoverBody>
					</PopoverContent>
				</Popover>
				<input
					type='file'
					hidden
					id='image'
					ref={image}
					onChange={handleImage}
				/>
				<div className='editMyProfile__info-user'>
					<h3 className='editMyProfile__info-name'>
						{user.name} {user.surname}
					</h3>
				</div>
			</div>
		</div>
	)
}

export default EditMyProfileInfo
