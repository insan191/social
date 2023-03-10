import {
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { SlPencil } from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import { fillUser } from '../../../../redux/reducers/user.js'
import axios from '../../../../utils/axios.js'

const MyProfileCover = ({ user, mouse }) => {
	const image = useRef()
	const dispatch = useDispatch()
	const addCover = async data => {
		try {
			const res = await axios.patch(`/users/${user._id}/addcover`, {
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
				.then(({ data }) => addCover(data.url))
		} catch (error) {
			console.log(error)
			alert('Ошибка при загрузке файла')
		}
	}

	return (
		<>
			{mouse === true && (
				<Popover>
					<PopoverTrigger>
						<button className='profile__info-cover'>
							<SlPencil />
							<span className='profile__info-cover-text'>
								{' '}
								Change cover
							</span>
						</button>
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
							<ul className='profile__info-popover-list'>
								<li
									className='profile__info-popover-item'
									onClick={() => image.current.click()}
								>
									Загрузить изображение
								</li>
								<li
									className='profile__info-popover-item'
									onClick={() => addCover('')}
								>
									Удалить
								</li>
							</ul>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			)}
			<input type='file' hidden id='image' ref={image} onChange={handleImage} />
		</>
	)
}

export default MyProfileCover
