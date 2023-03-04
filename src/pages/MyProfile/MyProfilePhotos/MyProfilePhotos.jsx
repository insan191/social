import { Button, CloseButton, Input } from '@chakra-ui/react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.esm.js'
import '@fancyapps/ui/dist/fancybox.css'
import { v4 as uuidv4 } from 'uuid'
import React, { useRef, useState } from 'react'
import axios from '../../../utils/axios.js'
import { useDispatch, useSelector } from 'react-redux'
import { fillUser } from '../../../redux/reducers/user.js'
import { userSelector } from '../../../redux/reselect.js'
import PhotosItem from './MyProfilePhotosItem.jsx'
import { useNavigate } from 'react-router-dom'
const MyProfilePhotos = () => {
	const navigate = useNavigate()
	const [photo, setPhoto] = useState('')
	const dispatch = useDispatch()
	const [desc, setDesc] = useState('')
	const image = useRef()
	const { user } = useSelector(userSelector)
	const handleImage = async e => {
		try {
			const formData = new FormData()
			const file = e.target.files[0]
			formData.append('image', file)
			await axios
				.post('/upload', formData)
				.then(({ data }) => setPhoto(data.url))
		} catch (error) {
			console.log(error)
			alert('Ошибка при загрузке файла')
		}
	}
	const resetHandler = () => {
		setPhoto('')
		setDesc('')
	}
	const addPhoto = async () => {
		try {
			const res = await axios.patch(`/users/${user._id}/addphoto`, {
				url: photo,
				description: desc,
				id: uuidv4(),
			})

			dispatch(fillUser(res.data))

			setDesc('')
			setPhoto('')
		} catch (err) {
			console.log(err)
		}
	}
	const delPhoto = async id => {
		try {
			const res = await axios.patch(`/users/${user._id}/delphoto`, {
				id,
			})
			dispatch(fillUser(res.data))
		} catch (err) {
			console.log(err)
		}
	}
	const arrPhotos = [...user.photos].reverse().slice(0, 3)
	return (
		<div className='profile__photos'>
			<div className='profile__photos-top'>
				<h2 className='profile__photos-title'>My Photos</h2>
				<input
					type='file'
					hidden
					id='image'
					ref={image}
					onChange={handleImage}
				/>
			</div>

			{photo.length ? (
				<>
					<div className='profile__photos-image'>
						<div className='profile__photos-image-block'>
							<CloseButton
								className='profile__photos-image-close'
								onClick={resetHandler}
							/>
							<img
								data-fancybox
								data-caption={desc}
								data-src={`${process.env.REACT_APP_URL}${photo}`}
								src={`${process.env.REACT_APP_URL}${photo}`}
								alt=''
								className='profile__photos-image-img'
							/>
							<Input
								value={desc}
								onChange={e => setDesc(e.target.value)}
								type='text'
								placeholder='Добавить описание'
								className='profile__photos-image-field'
							/>
						</div>
					</div>
					<div className='profile__photos-image-bottom'>
						<Button
							colorScheme='blue'
							variant='solid'
							className='profile__photos-image-addPhoto'
							onClick={addPhoto}
						>
							Опубликовать на моей странице
						</Button>
					</div>
				</>
			) : user.photos.length ? (
				<div className='profile__photos-row'>
					{arrPhotos.map(item => (
						<PhotosItem item={item} key={item.id} delPhoto={delPhoto} />
					))}
				</div>
			) : (
				<div className='profile__photos-empty'>Вы eще не добавили фото</div>
			)}
			<div className='profile__photos-btns'>
				<Button
					colorScheme='whiteAlpha'
					variant='solid'
					color='#ffffff'
					className='profile__photos-btn'
					onClick={() => image.current.click()}
				>
					Загрузить фото
				</Button>
				{arrPhotos.length ? (
					<Button
						colorScheme='whiteAlpha'
						variant='solid'
						color='#ffffff'
						className='profile__photos-btn'
						onClick={() => navigate('/photos')}
					>
						Показать все
					</Button>
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default MyProfilePhotos
