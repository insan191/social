import { Button, CloseButton, Input, Tooltip } from '@chakra-ui/react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox.esm.js'
import '@fancyapps/ui/dist/fancybox.css'
import { v4 as uuidv4 } from 'uuid'
import React, { useRef, useState } from 'react'
import axios from '../../utils/axios.js'
import { useDispatch, useSelector } from 'react-redux'
import { fillUser } from '../../redux/reducers/user.js'
import { userSelector } from '../../redux/reselect.js'
import PhotosItem from './PhotosItem/PhotosItem.jsx'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { IoIosAlbums } from 'react-icons/io'
const Photos = () => {
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
		<div className='photos'>
			<div className='photos__content'>
				<div className='photos__top'>
					<h2 className='photos__title'>My Photos</h2>
					<div className='photos__btns'>
						<Tooltip label='Создать альбом' aria-label='A tooltip'>
							<Button
								colorScheme='blackAlpha'
								variant='ghost'
								className='photos__btn'
							>
								<IoIosAlbums />
							</Button>
						</Tooltip>
						<Tooltip label='Добавить фотографию' aria-label='A tooltip'>
							<Button
								colorScheme='blackAlpha'
								variant='ghost'
								className='photos__btn'
								onClick={() => image.current.click()}
							>
								<MdOutlineAddPhotoAlternate />
							</Button>
						</Tooltip>
					</div>
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
						<div className='photos__image'>
							<div className='photos__image-block'>
								<CloseButton
									className='photos__image-close'
									onClick={resetHandler}
								/>
								<img
									data-fancybox
									data-caption={desc}
									data-src={`${process.env.REACT_APP_URL}${photo}`}
									src={`${process.env.REACT_APP_URL}${photo}`}
									alt=''
									className='photos__image-img'
								/>
								<Input
									value={desc}
									onChange={e => setDesc(e.target.value)}
									type='text'
									placeholder='Добавить описание'
									className='photos__image-field'
								/>
							</div>
							<div className='profile__photos-image-bottom'>
								<Button
									colorScheme='blue'
									variant='solid'
									size='lg'
									className='profile__photos-image-addPhoto'
									onClick={addPhoto}
								>
									Опубликовать на моей странице
								</Button>
							</div>
						</div>
					</>
				) : user.photos.length ? (
					<div className='photos__row'>
						{arrPhotos.map(item => (
							<PhotosItem item={item} key={item.id} delPhoto={delPhoto} />
						))}
					</div>
				) : (
					<div className='photos__empty'>
						Вы можете загружать тысячи фотографий IT-RUN web и помещать их в
						альбомы
					</div>
				)}
			</div>
		</div>
	)
}

export default Photos
